"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function WholesaleHowItWorks({ theme }) {
  const isLight = theme === "light";

  const steps = [
    {
      num: "01",
      title: "Submit Application",
      desc: "Complete the online wholesale application form, providing your commercial license or registration."
    },
    {
      num: "02",
      title: "Identity Verification",
      desc: "Our B2B verification team reviews your company details and trade license validity within 24 hours."
    },
    {
      num: "03",
      title: "Access B2B Portal",
      desc: "Upon validation, you will receive activation credentials to log in to our bulk wholesale interface."
    },
    {
      num: "04",
      title: "Secure Bulk Ordering",
      desc: "Browse tier pricing, add to cart, configure your shipping, and place bulk orders with priority shipping."
    }
  ];

  return (
    <section className="py-24 max-w-7xl mx-auto px-6 w-full">
      <div className="flex flex-col lg:flex-row gap-16 items-center">
        {/* Left column info */}
        <div className="lg:w-1/3 text-left">
          <h2 className="text-4xl font-black tracking-tight mb-6 font-outfit">Simple Onboarding Process</h2>
          <p className={`text-lg font-medium leading-relaxed mb-8 ${isLight ? "text-zinc-600" : "text-zinc-400"}`}>
            We have simplified onboarding so you can start placing bulk wholesale orders in under 24 hours. Our operations team is always on standby to fast-track setups.
          </p>
          <div className={`p-5 rounded-2xl border ${isLight ? "bg-emerald-50 border-emerald-200" : "bg-emerald-950/10 border-emerald-500/20"}`}>
            <h4 className="font-bold text-sm text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-2">Need Assistance?</h4>
            <p className={`text-xs leading-relaxed ${isLight ? "text-zinc-600" : "text-zinc-405"}`}>
              Reach out directly to our live B2B support desk at procurement@vapepods.ae for priority inquiries.
            </p>
          </div>
        </div>

        {/* Right column step cards */}
        <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`p-8 rounded-[2rem] border relative overflow-hidden transition-transform duration-300 hover:scale-[1.01] ${
                isLight ? "bg-white border-zinc-200 shadow-sm" : "bg-zinc-900/40 border-white/10"
              }`}
            >
              <span className={`text-[120px] font-black absolute -bottom-10 -right-6 select-none pointer-events-none opacity-5 leading-none ${
                isLight ? "text-zinc-900" : "text-white"
              }`}>
                {step.num}
              </span>
              <h4 className="text-xl font-bold mb-3 relative z-10 font-outfit">
                {step.num}. {step.title}
              </h4>
              <p className={`text-sm leading-relaxed relative z-10 ${isLight ? "text-zinc-600" : "text-zinc-400"}`}>
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
