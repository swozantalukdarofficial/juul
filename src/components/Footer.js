"use client";

import { useState } from "react";
import {
  Heart,
  Phone,
  Copy,
  Check,
  Mail,
  ChevronRight,
  ArrowUp,
  MapPin,
  AlertTriangle
} from "lucide-react";

export default function Footer({ setCurrentPage, theme }) {
  const isLight = theme === "light";
  const [copiedText, setCopiedText] = useState("");

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(""), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className={`transition-colors duration-500 text-zinc-500 dark:text-zinc-400 text-xs border-t py-12 relative overflow-hidden ${isLight ? "bg-zinc-50 border-zinc-200" : "bg-[#09090A] border-white/5"
      }`}>
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-8 relative z-10">

        {/* Column 1: Brand & Description & Socials */}
        <div className="lg:col-span-3 space-y-4 text-left lg:border-r border-zinc-200/60 dark:border-white/5 lg:pr-6">
          <div
            onClick={() => {
              setCurrentPage("home");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="cursor-pointer flex items-center gap-1 group w-fit select-none"
          >
            <span className="text-base font-black tracking-wider transition-colors font-outfit">
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
          </div>

          <p className="leading-relaxed font-medium">
            Shop premium engineered nicotine inhalation systems. Strictly delivering certified authentic hardware and vapor blend collections across the UAE.
          </p>

          <div className="grid grid-cols-2 gap-2 pt-3">
            {[
              {
                name: "Facebook",
                activeBorder: "hover:border-[#1877F2]/30",
                iconBg: "bg-[#1877F2]/10 text-[#1877F2]",
                icon: (
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                ),
                url: "https://facebook.com/juuluae"
              },
              {
                name: "Instagram",
                activeBorder: "hover:border-[#DD2A7B]/30",
                iconBg: "bg-[#DD2A7B]/10 text-[#DD2A7B]",
                icon: (
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                ),
                url: "https://instagram.com/juuluae"
              },
              {
                name: "WhatsApp",
                activeBorder: "hover:border-[#25D366]/30",
                iconBg: "bg-[#25D366]/10 text-[#25D366]",
                icon: (
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.019-5.114-2.875-6.973-1.857-1.859-4.335-2.88-6.97-2.882-5.437 0-9.863 4.42-9.867 9.864-.001 1.765.487 3.487 1.41 4.98L1.724 22.22l6.23-1.635c.197.108.397.214.603.307z" />
                    <path d="M17.472 14.382c-.301-.15-1.781-.879-2.056-.979-.275-.1-.475-.15-.675.15-.2.3-.775.979-.95 1.179-.175.2-.35.225-.651.075-.301-.15-1.27-.467-2.42-1.493-.895-.798-1.5-1.783-1.675-2.083-.175-.3-.019-.462.13-.61.135-.133.301-.352.451-.527.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.526-.075-.15-.675-1.625-.925-2.225-.244-.588-.492-.51-.675-.519-.175-.008-.375-.01-.575-.01-.2 0-.525.075-.8 1.05-.275 1.05-.85 2.575-.85 2.675 0 .1.05.2.2.35.15.15 1.34 2.046 3.25 2.875.455.197.81.314 1.087.402.458.147.876.126 1.205.077.367-.054 1.781-.729 2.03-1.432.25-.703.25-1.305.175-1.433-.075-.125-.275-.2-.575-.35z" />
                  </svg>
                ),
                url: "https://wa.me/97141234567"
              },
              {
                name: "TikTok",
                activeBorder: "hover:border-[#000000]/30 dark:hover:border-white/30",
                iconBg: "bg-black/5 dark:bg-white/10 text-black dark:text-white",
                icon: (
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                  </svg>
                ),
                url: "https://tiktok.com/@juuluae"
              }
            ].map((social, idx) => (
              <a
                key={idx}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2.5 p-2 rounded-xl border transition-all duration-300 group ${
                  isLight 
                    ? "bg-white border-zinc-200 hover:bg-zinc-50 shadow-sm" 
                    : "bg-zinc-900/50 border-white/5 hover:bg-zinc-900"
                } ${social.activeBorder}`}
                aria-label={social.name}
              >
                <div className={`w-7 h-7 rounded-lg flex shrink-0 items-center justify-center transition-all ${social.iconBg}`}>
                  {social.icon}
                </div>
                <span className={`text-[11px] font-bold tracking-wide transition-colors ${isLight ? "text-zinc-700 group-hover:text-zinc-950" : "text-zinc-400 group-hover:text-white"}`}>
                  {social.name}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="lg:col-span-2 space-y-3 text-left lg:border-r border-zinc-200/60 dark:border-white/5 lg:pr-6 lg:pl-2">
          <h4 className={`text-xs uppercase font-black tracking-widest ${isLight ? "text-zinc-800" : "text-white"}`}>
            Quick Links
          </h4>
          <ul className="space-y-2 text-xs font-semibold">
            {[
              { label: "Home", action: () => setCurrentPage("home") },
              { label: "Shop", action: () => setCurrentPage("collection") },
              {
                label: "About Us", action: () => {
                  setCurrentPage("home");
                  setTimeout(() => {
                    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
                  }, 150);
                }
              },
              {
                label: "FAQ", action: () => {
                  setCurrentPage("home");
                  setTimeout(() => {
                    document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" });
                  }, 150);
                }
              },
              { label: "Privacy", action: () => setCurrentPage("home") },
              { label: "Terms", action: () => setCurrentPage("home") }
            ].map((link, idx) => (
              <li key={idx}>
                <button
                  onClick={() => {
                    link.action();
                    if (link.label !== "About Us" && link.label !== "FAQ") {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }}
                  className={`transition-colors cursor-pointer text-left block w-full ${isLight ? "hover:text-blue-600 text-zinc-500" : "hover:text-emerald-400 text-zinc-450"}`}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Shop Collections */}
        <div className="lg:col-span-2 space-y-3 text-left lg:border-r border-zinc-200/60 dark:border-white/5 lg:pr-6 lg:pl-2">
          <h4 className={`text-xs uppercase font-black tracking-widest ${isLight ? "text-zinc-800" : "text-white"}`}>
            Collections
          </h4>
          <ul className="space-y-2 text-xs font-semibold">
            {[
              { name: "JUUL 2 Devices" },
              { name: "JUUL 2 Pods" },
              { name: "JUUL 1 Devices" },
              { name: "JUUL 1 Pods" },
              { name: "Starter Kits" },
              { name: "All Products" }
            ].map((item, idx) => (
              <li key={idx}>
                <button
                  onClick={() => {
                    setCurrentPage("collection");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={`transition-colors cursor-pointer block w-full text-left ${isLight ? "hover:text-blue-600 text-zinc-500" : "hover:text-emerald-400 text-zinc-450"}`}
                >
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Contact & Location */}
        <div className="lg:col-span-3 space-y-3 text-left lg:border-r border-zinc-200/60 dark:border-white/5 lg:pr-6 lg:pl-2">
          <h4 className={`text-xs uppercase font-black tracking-widest ${isLight ? "text-zinc-800" : "text-white"}`}>
            Contact & Location
          </h4>
          <p className="leading-relaxed font-semibold">
            Suite 807, Floor 8, Sheikh Zayed Road, Downtown Dubai, UAE.
          </p>

          <div className="space-y-2 pt-2">
            {[
              { id: "tel1", number: "+971 4 123 4567" },
              { id: "tel2", number: "+971 50 987 6543" }
            ].map((phone) => (
              <div
                key={phone.id}
                className={`flex items-center justify-between px-3 py-2 rounded-xl border transition-all ${
                  isLight 
                    ? "bg-white border-zinc-200 hover:border-blue-200 hover:bg-blue-50/50 shadow-sm" 
                    : "bg-zinc-900/50 border-white/5 hover:border-emerald-500/20 hover:bg-emerald-950/20"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className={`p-1 rounded-md ${isLight ? "bg-blue-100 text-blue-600" : "bg-emerald-500/10 text-emerald-400"}`}>
                    <Phone className="w-3.5 h-3.5" />
                  </div>
                  <span className={`text-xs font-black tracking-wide ${isLight ? "text-zinc-800" : "text-zinc-200"}`}>
                    {phone.number}
                  </span>
                </div>
                <button
                  onClick={() => handleCopy(phone.number, phone.id)}
                  className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                    copiedText === phone.id
                      ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                      : isLight 
                        ? "bg-zinc-100 text-zinc-500 hover:bg-blue-100 hover:text-blue-700" 
                        : "bg-zinc-800 text-zinc-400 hover:bg-emerald-900/40 hover:text-emerald-400"
                  }`}
                  title="Copy Number"
                >
                  {copiedText === phone.id ? (
                    <Check className="w-3.5 h-3.5" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Column 5: Mini Map & Newsletter */}
        <div className="lg:col-span-2 space-y-3 text-left lg:pl-2">
          <h4 className={`text-xs uppercase font-black tracking-widest ${isLight ? "text-zinc-800" : "text-white"}`}>
            Location Map
          </h4>

          <a
            href="https://maps.google.com/?q=Sheikh+Zayed+Road,+Downtown+Dubai"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-20 rounded-xl overflow-hidden border relative group block transition-all duration-300 border-zinc-200 dark:border-white/5"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.17865234193!2d55.2721877!3d25.197197!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43348a67e24b%3A0xff45e502e1c7e2!2sSheikh%20Zayed%20Rd%20-%20Dubai!5e0!3m2!1sen!2sae!4v1700000000000!5m2!1sen!2sae"
              width="100%"
              height="100%"
              style={{ border: 0, filter: isLight ? "none" : "invert(90%) hue-rotate(180deg) grayscale(10%) contrast(90%)" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full opacity-80"
              title="Location"
            />
          </a>

          <div className="relative flex items-center pt-1">
            <input
              id="newsletter-email"
              name="newsletter-email"
              aria-label="Newsletter Email"
              type="email"
              placeholder="Newsletter Email"
              className={`w-full text-[11px] py-1.5 pl-3 pr-8 rounded-lg border transition-all focus:outline-none ${isLight
                  ? "bg-white border-zinc-200 text-zinc-900 focus:border-blue-600"
                  : "bg-white/5 border-white/10 text-white focus:border-emerald-400"
                }`}
            />
            <button className={`absolute right-1.5 p-1 rounded transition-all cursor-pointer ${isLight ? "text-blue-650 hover:text-blue-800" : "text-emerald-400 hover:text-emerald-300"
              }`} aria-label="Submit email">
              <ChevronRight className="w-3.5 h-3.5 stroke-[3px]" />
            </button>
          </div>
        </div>

      </div>

      {/* Mandatory vape legal disclaimer & copyright */}
      <div className={`max-w-7xl mx-auto px-6 mt-8 pt-6 border-t space-y-6 relative z-10 ${isLight ? "border-zinc-200" : "border-white/5"
        }`}>

        {/* Warning Badge - Luxury Editorial Style with Color Accent */}
        <div className={`py-6 border-y max-w-3xl mx-auto transition-all text-center space-y-2 ${
          isLight 
            ? "border-red-200/50" 
            : "border-red-950/20"
        }`}>
          <p className={`font-black uppercase tracking-[0.25em] text-[10px] ${
            isLight ? "text-red-600" : "text-red-400"
          }`}>
            Government Warning
          </p>
          <p className={`text-[11px] sm:text-xs font-semibold tracking-wide max-w-2xl mx-auto leading-relaxed ${
            isLight ? "text-zinc-650" : "text-zinc-400"
          }`}>
            This product contains <span className={isLight ? "text-red-600" : "text-red-400"}>nicotine</span>. Nicotine is an <span className={isLight ? "text-red-650" : "text-red-450"}>addictive chemical</span>. Underage sales are strictly prohibited. Verified adult smokers only. <span className={isLight ? "text-red-600" : "text-red-400"}>Age 21+</span> strictly verified at delivery.
          </p>
        </div>

        {/* Footer Bottom Info */}
        <div className="flex flex-col md:flex-row items-center justify-between text-xs text-zinc-500 gap-6">
          <p className="font-semibold text-center md:text-left">
            Copyright © {new Date().getFullYear()} Vape Pods UAE. All rights reserved.
          </p>

          <div className="flex items-center gap-6 font-bold">
            <button
              onClick={() => {
                setCurrentPage("home");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`transition-colors cursor-pointer ${isLight ? "hover:text-blue-600 text-zinc-500" : "hover:text-emerald-400 text-zinc-450"}`}
            >
              Terms
            </button>
            <button
              onClick={() => {
                setCurrentPage("home");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`transition-colors cursor-pointer ${isLight ? "hover:text-blue-600 text-zinc-500" : "hover:text-emerald-400 text-zinc-450"}`}
            >
              Privacy
            </button>

            <button
              onClick={scrollToTop}
              className={`p-2 rounded-full border transition-all cursor-pointer hover:scale-105 active:scale-95 flex items-center justify-center ${isLight
                  ? "bg-white border-zinc-200 text-zinc-700 hover:text-blue-650 hover:bg-zinc-50 hover:border-blue-200 shadow-sm"
                  : "bg-white/5 border-white/10 text-zinc-350 hover:text-emerald-400 hover:bg-white/10 hover:border-emerald-500/20"
                }`}
              title="Scroll to top"
            >
              <ArrowUp className="w-3.5 h-3.5 stroke-[2.5px]" />
            </button>
          </div>
        </div>
        <div className="flex justify-center items-center gap-1 font-semibold text-[10px] text-zinc-500 pt-2">
          Made with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> & Webestone.
        </div>
      </div>
    </footer>
  );
}
