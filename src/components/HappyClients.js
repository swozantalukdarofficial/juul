"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star, Quote } from "lucide-react";

function AnimatedCounter({ value, duration = 1.5 }) {
  const [count, setCount] = useState("0");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    const cleanString = value.replace(/,/g, "");
    const numericMatch = cleanString.match(/[\d.]+/);
    if (!numericMatch) {
      setCount(value);
      return;
    }
    const endVal = parseFloat(numericMatch[0]);
    const isDecimal = cleanString.includes(".");
    const suffix = value.replace(numericMatch[0], "");

    let startTime = null;

    const animateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const currentVal = progress * endVal;

      if (isDecimal) {
        setCount(currentVal.toFixed(1) + suffix);
      } else {
        const roundedVal = Math.round(currentVal);
        const formattedVal = roundedVal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        setCount(formattedVal + suffix);
      }

      if (progress < 1) {
        window.requestAnimationFrame(animateCount);
      } else {
        setCount(value);
      }
    };

    window.requestAnimationFrame(animateCount);
  }, [isInView, value, duration]);

  return <span ref={ref}>{count}</span>;
}

const testimonials = [
  {
    name: "Ahmed Al Rashid",
    initials: "AR",
    role: "Dubai, UAE",
    rating: 5,
    comment: "Ordered JUUL 2 on a Friday afternoon, got it by Saturday morning. Packaging was perfect and the Cool Mint flavor is absolutely premium. Will never go back to anything else.",
    avatarColor: "#10B981",
    product: "JUUL 2 - Polar Mint"
  },
  {
    name: "Sara Al Mansouri",
    initials: "SM",
    role: "Abu Dhabi, UAE",
    rating: 5,
    comment: "The Mango flavor is incredibly authentic, not artificial at all. Love how sleek the device looks — it genuinely feels like an Apple product in terms of build quality.",
    avatarColor: "#F59E0B",
    product: "JUUL 2 - Summer Gold Mango"
  },
  {
    name: "Khaled Ibrahim",
    initials: "KI",
    role: "Sharjah, UAE",
    rating: 5,
    comment: "سلعة ممتازة وتوصيل سريع. الجهاز صغير ومريح والنكهة رائعة. أنصح به بشدة!",
    avatarColor: "#E11D48",
    product: "JUUL 1 - Virginia Tobacco"
  },
  {
    name: "Priya Sharma",
    initials: "PS",
    role: "Dubai Marina",
    rating: 5,
    comment: "The berry flavor in JUUL 2 is my absolute obsession. Delivery was in under 2 hours and the customer service WhatsApp was super responsive. 10/10 experience!",
    avatarColor: "#EC4899",
    product: "JUUL 2 - Blackcurrant Berry"
  },
  {
    name: "James Whitfield",
    initials: "JW",
    role: "Business Bay, Dubai",
    rating: 5,
    comment: "Switched from a competitor brand and never looking back. The JUUL 2's vapor quality is in a different league. The menthol ice punch is absolutely incredible.",
    avatarColor: "#06B6D4",
    product: "JUUL 2 - Crisp Menthol"
  },
  {
    name: "Fatima Al Zaabi",
    initials: "FZ",
    role: "Ajman, UAE",
    rating: 5,
    comment: "Honestly shocked at how fast the delivery was. Ordered late at night and it arrived before noon the next day. The classic tobacco is so smooth and satisfying.",
    avatarColor: "#78716C",
    product: "JUUL 1 - Classic Menthol"
  },
  {
    name: "Marcus Chen",
    initials: "MC",
    role: "DIFC, Dubai",
    rating: 5,
    comment: "As someone who travels frequently, the JUUL's compact design is unbeatable. The leather carry case is an incredible addition — genuinely luxurious.",
    avatarColor: "#8B5CF6",
    product: "Tactical Leather Case + JUUL 2"
  },
  {
    name: "Nour Al Jaber",
    initials: "NJ",
    role: "Jumeirah, Dubai",
    rating: 5,
    comment: "The spiced Autumn Gold pod from JUUL 2 is unique and complex. Really impressed by how different flavors are available compared to other brands in the UAE market.",
    avatarColor: "#B45309",
    product: "JUUL 2 - Autumn Gold"
  }
];

const stats = [
  { value: "4,800+", label: "Happy Clients" },
  { value: "4.9★", label: "Average Rating" },
  { value: "2hrs", label: "Avg. Delivery Time" },
  { value: "99%", label: "Repeat Customers" }
];

// Duplicate for seamless infinite scroll
const doubledTestimonials = [...testimonials, ...testimonials];

function ReviewCard({ review, isLight }) {
  return (
    <div
      className={`flex-shrink-0 w-[340px] p-6 rounded-3xl border flex flex-col gap-4 mx-3 transition-all duration-300 ${
        isLight
          ? "bg-white border-zinc-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.02)]"
          : "bg-white/[0.02] border-white/5"
      }`}
    >
      {/* Top: Stars + Quote Icon */}
      <div className="flex items-center justify-between">
        <div className="flex gap-0.5">
          {[...Array(review.rating)].map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          ))}
        </div>
        <Quote
          className="w-6 h-6 opacity-10"
          style={{ color: review.avatarColor }}
        />
      </div>

      {/* Comment */}
      <p className={`text-sm leading-relaxed font-light flex-1 ${
        isLight ? "text-zinc-600" : "text-zinc-400"
      }`}>
        "{review.comment}"
      </p>

      {/* Product tag */}
      <span
        className="text-[9px] uppercase font-black tracking-widest px-3 py-1 rounded-full w-fit"
        style={{
          backgroundColor: `${review.avatarColor}12`,
          color: review.avatarColor
        }}
      >
        {review.product}
      </span>

      {/* Author */}
      <div className="flex items-center gap-3 pt-1 border-t border-zinc-100 dark:border-white/5">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-black flex-shrink-0"
          style={{ backgroundColor: review.avatarColor }}
        >
          {review.initials}
        </div>
        <div className="min-w-0">
          <p className={`text-xs font-black truncate ${isLight ? "text-zinc-950" : "text-white"}`}>
            {review.name}
          </p>
          <p className={`text-[10px] font-medium ${isLight ? "text-zinc-400" : "text-zinc-500"}`}>
            {review.role} · Verified Buyer
          </p>
        </div>
      </div>
    </div>
  );
}

export default function HappyClients({ theme }) {
  const isLight = theme === "light";

  return (
    <section className={`py-24 overflow-hidden transition-colors duration-500 ${
      isLight ? "bg-zinc-50/60" : "bg-[#080809]"
    }`}>
      <div className="max-w-7xl mx-auto px-6 mb-14">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-3">
            <span className={`text-xs font-bold uppercase tracking-widest ${
              isLight ? "text-zinc-400" : "text-zinc-500"
            }`}>
              Community Verified
            </span>
            <h2 className={`text-3xl sm:text-5xl font-black tracking-tight ${
              isLight ? "text-zinc-950" : "text-white"
            }`}>
              Happy Clients <span className="text-amber-400">★</span>
            </h2>
            <p className={`text-sm font-light max-w-lg leading-relaxed ${
              isLight ? "text-zinc-500" : "text-zinc-400"
            }`}>
              Thousands of vapers across UAE trust us for authentic JUUL products, lightning-fast delivery, and unrivaled flavor satisfaction.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={`px-5 py-4 rounded-2xl border text-center transition-colors ${
                  isLight
                    ? "bg-white border-zinc-200 shadow-sm"
                    : "bg-white/[0.02] border-white/5"
                }`}
              >
                <p className={`text-xl font-black tabular-nums ${
                  isLight ? "text-zinc-950" : "text-white"
                }`}>
                  <AnimatedCounter value={stat.value} />
                </p>
                <p className={`text-[10px] uppercase tracking-widest font-bold mt-0.5 ${
                  isLight ? "text-zinc-400" : "text-zinc-500"
                }`}>
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Infinite Auto-scroll Marquee Row 1 (left to right) ── */}
      <div className="relative w-full overflow-hidden mb-4">
        {/* Left fade mask */}
        <div className={`absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none ${
          isLight
            ? "bg-gradient-to-r from-zinc-50/60 to-transparent"
            : "bg-gradient-to-r from-[#080809] to-transparent"
        }`} />
        {/* Right fade mask */}
        <div className={`absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none ${
          isLight
            ? "bg-gradient-to-l from-zinc-50/60 to-transparent"
            : "bg-gradient-to-l from-[#080809] to-transparent"
        }`} />

        <motion.div
          className="flex"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {doubledTestimonials.map((review, i) => (
            <ReviewCard key={`row1-${i}`} review={review} isLight={isLight} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
