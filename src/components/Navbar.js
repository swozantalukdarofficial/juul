"use client";

import { motion } from "framer-motion";
import { ShoppingBag, ChevronRight, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar({ currentPage, setCurrentPage, cartCount, setIsCartOpen, theme, setTheme, versionFilter = "all", setVersionFilter }) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: "juul1", label: "Juul 1" },
    { id: "juul2", label: "Juul 2" },
    { id: "wholesale", label: "Wholesale" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
  ];

  const handleNavClick = (itemId) => {
    if (itemId === "about") {
      if (currentPage !== "home") {
        setCurrentPage("home");
        setTimeout(() => {
          const element = document.getElementById("features");
          if (element) element.scrollIntoView({ behavior: "smooth" });
        }, 150);
      } else {
        const element = document.getElementById("features");
        if (element) element.scrollIntoView({ behavior: "smooth" });
      }
    } else if (itemId === "contact" || itemId === "wholesale") {
      if (currentPage !== "home") {
        setCurrentPage("home");
        setTimeout(() => {
          const element = document.getElementById("contact-section");
          if (element) element.scrollIntoView({ behavior: "smooth" });
        }, 150);
      } else {
        const element = document.getElementById("contact-section");
        if (element) element.scrollIntoView({ behavior: "smooth" });
      }
    } else if (itemId === "juul1") {
      setVersionFilter("juul1");
      setCurrentPage("collection");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (itemId === "juul2") {
      setVersionFilter("juul2");
      setCurrentPage("collection");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setCurrentPage(itemId);
    }
  };

  const isItemActive = (itemId) => {
    if (itemId === "juul1") {
      return currentPage === "collection" && versionFilter === "juul1";
    }
    if (itemId === "juul2") {
      return currentPage === "collection" && versionFilter === "juul2";
    }
    return currentPage === itemId;
  };

  const isLight = theme === "light";

  return (
    <motion.nav 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={`fixed top-6 left-1/2 -translate-x-1/2 w-[92%] max-w-7xl z-50 rounded-2xl sm:rounded-full backdrop-blur-2xl border transition-all duration-500 py-3 px-4 sm:px-6 ${
        isLight 
          ? "bg-white/75 border-zinc-200/80 shadow-[0_15px_40px_rgba(0,0,0,0.06)] text-zinc-950" 
          : "bg-[#0A0A0B]/70 border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.8),0_0_20px_rgba(16,185,129,0.03)] text-white"
      }`}
    >
      <div className="flex items-center justify-between h-12 relative w-full min-w-0">
        
        {/* Left Side: Brand Logo & Cyber Sync Link */}
        <div className="flex items-center gap-6">
          <div 
            onClick={() => setCurrentPage("home")} 
            className="cursor-pointer flex items-center gap-2 group"
          >
            <span className={`text-xl sm:text-2xl font-black tracking-[0.2em] transition-colors ${
              isLight ? "text-zinc-950 group-hover:text-blue-600" : "text-white group-hover:text-emerald-400"
            }`}>
              JUUL
            </span>
            <span className={`w-1.5 h-1.5 rounded-full animate-ping ${
              isLight ? "bg-blue-600" : "bg-emerald-400"
            }`} />
          </div>

        </div>

        <div className="hidden md:flex items-center gap-0.5 min-w-0 overflow-hidden">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`relative text-[10px] font-bold tracking-wider uppercase transition-all py-2 px-3 lg:px-5 rounded-full cursor-pointer whitespace-nowrap ${
                isItemActive(item.id) 
                  ? isLight ? "text-white font-semibold" : "text-zinc-950 font-semibold"
                  : isLight ? "text-zinc-650 hover:text-zinc-950" : "text-zinc-400 hover:text-white"
              }`}
            >
              <span className="relative z-10">{item.label}</span>
              
              {/* Premium Active Brand Capsule */}
              {isItemActive(item.id) && (
                <motion.div 
                  layoutId="activeNavBackground"
                  className={`absolute inset-0 rounded-full border shadow-sm ${
                    isLight ? "bg-zinc-950 border-zinc-950" : "bg-white border-white"
                  }`}
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Right Side: Sci-fi Cart, Theme Toggle & Glowing Action CTA */}
        <div className="flex items-center gap-2 flex-shrink-0">
          
          {/* Cart Icon */}
          <button 
            onClick={() => setIsCartOpen(true)}
            className={`relative p-2.5 rounded-full border transition-all cursor-pointer group ${
              isLight 
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
                className={`absolute -top-1 -right-1 text-[9px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-lg ${
                  isLight 
                    ? "bg-zinc-950 text-white shadow-zinc-950/20" 
                    : "bg-white text-zinc-950 shadow-white/20"
                }`}
              >
                {cartCount}
              </motion.span>
            )}
          </button>

          {/* Premium CTA */}
          <button 
            onClick={() => setCurrentPage("collection")}
            className={`hidden lg:flex items-center gap-2 font-bold text-[10px] uppercase tracking-widest px-5 py-2.5 rounded-full cursor-pointer transition-all hover:scale-[1.03] shadow-sm whitespace-nowrap ${
              isLight 
                ? "bg-zinc-950 hover:bg-zinc-900 text-white" 
                : "bg-white hover:bg-zinc-100 text-zinc-950"
            }`}
          >
            Order Pod <ChevronRight className="w-3.5 h-3.5 stroke-[3px]" />
          </button>

          {/* Mobile Menu Toggle Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2.5 rounded-full border transition-colors cursor-pointer ${
              isLight 
                ? "bg-zinc-100 border-zinc-200 text-zinc-700 hover:text-zinc-950" 
                : "bg-white/[0.02] border-white/5 text-zinc-400 hover:text-white"
            }`}
          >
            {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Cyber Drawer */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className={`md:hidden mt-4 pt-4 border-t space-y-3 ${
            isLight ? "border-zinc-200" : "border-white/5"
          }`}
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                handleNavClick(item.id);
                setIsOpen(false);
              }}
              className={`block w-full text-left py-2 px-3 rounded-xl text-xs font-bold tracking-widest uppercase transition-all cursor-pointer ${
                isItemActive(item.id) 
                  ? isLight 
                    ? "bg-zinc-100 text-zinc-950 font-black border-l-2 border-zinc-950 pl-4"
                    : "bg-white/5 text-white font-bold border-l-2 border-white pl-4" 
                  : isLight
                  ? "text-zinc-500 hover:text-zinc-950 pl-3"
                  : "text-zinc-400 hover:text-white pl-3"
              }`}
            >
              {item.label}
            </button>
          ))}
          
          <button 
            onClick={() => {
              setCurrentPage("collection");
              setIsOpen(false);
            }}
            className={`w-full text-center font-bold py-3 rounded-full text-[10px] uppercase tracking-widest block cursor-pointer transition-colors shadow-sm ${
              isLight 
                ? "bg-zinc-950 hover:bg-zinc-900 text-white" 
                : "bg-white hover:bg-zinc-100 text-zinc-950"
            }`}
          >
            Order Pod
          </button>
        </motion.div>
      )}
    </motion.nav>
  );
}
