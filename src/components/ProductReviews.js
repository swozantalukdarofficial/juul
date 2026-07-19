"use client";

import { useState } from "react";
import { Star, ThumbsUp, CheckCircle2, MessageSquare, Filter, ShieldCheck, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductReviews({ productName = "JUUL Product", theme }) {
  const isLight = theme === "light";
  const [activeFilter, setActiveFilter] = useState("all");
  
  const [reviews, setReviews] = useState([
    {
      id: 1,
      author: "Faisal K.",
      rating: 5,
      date: "June 08, 2026",
      comment: "Absolutely genuine pod pack. Polar Mint flavor is super crisp and hits just right. Delivery to Dubai Marina took only 3 hours! Outstanding service.",
      helpfulCount: 24,
      isVerified: true,
      tag: "Polar Mint Pods",
      avatarGradient: "from-emerald-500 to-emerald-600 text-white"
    },
    {
      id: 2,
      author: "Sarah M.",
      rating: 5,
      date: "June 03, 2026",
      comment: "The Ruby Edition looks extremely premium! Upgraded from JUUL 1, the battery life is way better and it draws much smoother. Totally worth it.",
      helpfulCount: 15,
      isVerified: true,
      tag: "JUUL 2 Ruby Starter Kit",
      avatarGradient: "from-red-500 to-red-600 text-white"
    },
    {
      id: 3,
      author: "Amit S.",
      rating: 4,
      date: "May 27, 2026",
      comment: "Very nice accessory. Cable is braided, sturdy and snaps magnetically. Docking is very reliable, just wish it was slightly longer.",
      helpfulCount: 7,
      isVerified: true,
      tag: "USB Charging Dock",
      avatarGradient: "from-zinc-500 to-zinc-650 text-white"
    }
  ]);

  const handleHelpful = (id) => {
    setReviews(prev =>
      prev.map(r => r.id === id ? { ...r, helpfulCount: r.helpfulCount + 1 } : r)
    );
  };

  const filteredReviews = reviews.filter(r => {
    if (activeFilter === "all") return true;
    return r.rating === parseInt(activeFilter);
  });

  const getInitials = (name) => {
    return name.split(" ").map(n => n[0]).join("");
  };

  return (
    <div className={`pt-16 border-t text-left ${isLight ? "border-zinc-200" : "border-white/5"}`}>
      {/* Header and highlights */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="flex items-center gap-2 mb-2 text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-widest">
              100% Genuine Customer Feedback
            </span>
          </div>
          <h3 className={`text-2xl sm:text-3xl font-black ${isLight ? "text-zinc-950" : "text-white"}`}>
            What Our Community Says
          </h3>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: "all", label: "All Reviews" },
            { id: "5", label: "5 Stars" },
            { id: "4", label: "4 Stars" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                activeFilter === tab.id
                  ? isLight
                    ? "bg-zinc-950 text-white shadow-lg shadow-zinc-950/20"
                    : "bg-white text-zinc-950"
                  : isLight
                  ? "bg-zinc-100 hover:bg-zinc-200 text-zinc-650"
                  : "bg-white/5 hover:bg-white/10 text-zinc-400"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left: Summary Circular Badge Card */}
        <div className="md:col-span-4 space-y-6">
          <div className={`p-8 rounded-3xl border text-center space-y-4 ${
            isLight ? "bg-white border-zinc-200 shadow-sm" : "bg-zinc-950/30 border-white/5"
          }`}>
            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
              Verified Average Score
            </p>
            
            {/* Circular Rating Display */}
            <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
              <svg className="absolute w-full h-full transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke={isLight ? "#F4F4F5" : "#18181B"}
                  strokeWidth="8"
                  fill="transparent"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="#10B981"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray="351"
                  strokeDashoffset="10"
                  strokeLinecap="round"
                />
              </svg>
              <div className="flex flex-col items-center">
                <span className={`text-3xl font-black ${isLight ? "text-zinc-950" : "text-white"}`}>
                  4.9
                </span>
                <span className="text-[9px] uppercase font-bold text-zinc-500">
                  Out of 5
                </span>
              </div>
            </div>

            <div className="flex justify-center gap-0.5 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>

            <p className="text-[11px] text-zinc-500 font-medium">
              Based on 450+ verified deliveries in Dubai & Abu Dhabi.
            </p>
          </div>

          {/* Highlights tag container */}
          <div className={`p-6 rounded-3xl border space-y-3 ${
            isLight ? "bg-zinc-50/50 border-zinc-200" : "bg-zinc-950/10 border-white/5"
          }`}>
            <h4 className={`text-[10px] font-black uppercase tracking-widest ${isLight ? "text-zinc-500" : "text-zinc-400"}`}>
              Service Highlights
            </h4>
            <div className="flex flex-wrap gap-2">
              <span className="text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400">
                ⚡ 3-Hour Dubai Delivery
              </span>
              <span className="text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400">
                📦 100% Sealed Genuine
              </span>
              <span className="text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400">
                ⭐ Rated 4.9 by users
              </span>
            </div>
          </div>
        </div>

        {/* Right: Unique Review Message Cards */}
        <div className="md:col-span-8 space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredReviews.length > 0 ? (
              filteredReviews.map((rev) => (
                <motion.div
                  key={rev.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className={`p-6 rounded-3xl border relative overflow-hidden transition-all duration-300 hover:scale-[1.01] ${
                    isLight 
                      ? "bg-white border-zinc-200 hover:border-zinc-350 shadow-sm" 
                      : "bg-zinc-950/20 border-white/5 hover:border-white/10"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      {/* Avatar with initials & dynamic gradient */}
                      <div className={`w-9 h-9 rounded-full bg-gradient-to-tr flex items-center justify-center text-xs font-black shadow-md ${rev.avatarGradient}`}>
                        {getInitials(rev.author)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`text-sm font-black ${isLight ? "text-zinc-900" : "text-white"}`}>
                            {rev.author}
                          </span>
                          <span className="inline-flex items-center gap-1 text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            ✓ Verified Buyer
                          </span>
                        </div>
                        {/* Variant Purchased Tag */}
                        <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider">
                          Purchased: {rev.tag}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:items-end">
                      <span className="text-[10px] text-zinc-500 font-semibold">{rev.date}</span>
                      <div className="flex items-center gap-0.5 text-amber-400 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < rev.rating ? "fill-amber-400 text-amber-400" : "text-zinc-700"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Review Text */}
                  <p className={`mt-4 text-xs sm:text-sm font-light leading-relaxed ${
                    isLight ? "text-zinc-750" : "text-zinc-300"
                  }`}>
                    "{rev.comment}"
                  </p>

                  {/* Helpful Button & Actions */}
                  <div className="flex items-center justify-between pt-4 mt-4 border-t border-dashed border-zinc-150 dark:border-white/5">
                    <button
                      onClick={() => handleHelpful(rev.id)}
                      className={`flex items-center gap-2 text-[9px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full border transition-all cursor-pointer ${
                        isLight
                          ? "bg-zinc-50 border-zinc-200 text-zinc-650 hover:bg-zinc-100 hover:text-zinc-950"
                          : "bg-white/5 border-white/5 text-zinc-400 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <ThumbsUp className="w-3 h-3 text-emerald-400" />
                      Helpful ({rev.helpfulCount})
                    </button>
                    
                    <span className="text-[8px] uppercase tracking-widest text-zinc-500 font-bold">
                      🛡️ Secure Feedback
                    </span>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-10">
                <p className="text-sm text-zinc-500">No reviews found matching filters.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
