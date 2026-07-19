"use client";

import { motion } from "framer-motion";
import { ShieldCheck, TrendingUp, Truck, Headphones } from "lucide-react";

export default function WholesaleBenefits({ theme }) {
  const isLight = theme === "light";

  const benefits = [
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: "100% Authentic Guarantee",
      desc: "All products are sourced directly from manufacturers or authorized distributors. Strictly genuine items only."
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Tiered Bulk Pricing",
      desc: "Maximize your margins. Our custom wholesale structures guarantee that the more you purchase, the more you save."
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Express B2B Logistics",
      desc: "Priority warehousing and fulfillment. Enjoy same-day/next-day shipping across Dubai and GCC wide distribution."
    },
    {
      icon: <Headphones className="w-8 h-8" />,
      title: "Dedicated Account Support",
      desc: "A personal account manager to oversee your shipments, bulk quotes, and handle wholesale RMA claims instantly."
    }
  ];

  return (
    <section className={`py-24 border-y transition-colors duration-500 ${isLight ? "bg-white border-zinc-200" : "bg-zinc-900/30 border-white/5"}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black tracking-tight mb-4 font-outfit">Why Partner With VAPEPODS?</h2>
          <p className={`text-lg font-medium ${isLight ? "text-zinc-650" : "text-zinc-400"}`}>
            Unmatched infrastructure tailored to support vape outlets, online stores, and distributors at scale.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`p-8 rounded-3xl border transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between ${
                isLight
                  ? "bg-zinc-50 border-zinc-200 hover:shadow-xl hover:shadow-zinc-200/50"
                  : "bg-zinc-900/40 border-white/10 hover:bg-zinc-800/50 hover:shadow-2xl hover:shadow-black/50"
              }`}
            >
              <div>
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-colors ${
                  isLight ? "bg-emerald-50 text-emerald-600" : "bg-emerald-500/10 text-emerald-400"
                }`}>
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 font-outfit">{benefit.title}</h3>
                <p className={`text-sm leading-relaxed ${isLight ? "text-zinc-600" : "text-zinc-400"}`}>
                  {benefit.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
