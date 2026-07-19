"use client";

import { Truck, RefreshCcw, Banknote, CreditCard } from "lucide-react";

export default function ProductFeatures({ theme }) {
  const isLight = theme === "light";

  const features = [
    {
      id: 1,
      icon: <Truck className="w-5 h-5 text-white" />,
      title: "Free Shipping",
      desc: "On all orders above 300 AED",
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      id: 2,
      icon: <RefreshCcw className="w-5 h-5 text-white" />,
      title: "Fast Delivery",
      desc: "Delivery inside Dubai Within 3hrs",
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      id: 3,
      icon: <Banknote className="w-5 h-5 text-white" />,
      title: "Cash On Delivery",
      desc: "Cash on delivery available all over UAE",
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      id: 4,
      icon: <CreditCard className="w-5 h-5 text-white" />,
      title: "Secure Payment",
      desc: "100% Safe & Secure Checkout",
      gradient: "from-emerald-500 to-teal-500",
    },
  ];

  return (
    <div className={`mb-10 rounded-3xl border p-4 sm:p-6 ${isLight ? "bg-white border-zinc-200" : "bg-[#0b0b0d] border-zinc-800"}`}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((feature) => (
          <div
            key={feature.id}
            className={`p-5 rounded-2xl flex flex-col gap-3 transition-colors ${isLight
                ? "bg-zinc-50 border border-zinc-200 hover:border-zinc-300"
                : "bg-[#121214] border border-white/5 hover:border-white/10"
              }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br ${feature.gradient} shadow-lg shadow-emerald-500/15`}>
              {feature.icon}
            </div>
            <div>
              <h4 className={`text-sm font-bold mb-1 ${isLight ? "text-zinc-900" : "text-white"}`}>
                {feature.title}
              </h4>
              <p className={`text-xs font-medium ${isLight ? "text-zinc-500" : "text-zinc-400"}`}>
                {feature.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
