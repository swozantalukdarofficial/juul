"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

export default function WholesaleFAQ({ theme }) {
  const isLight = theme === "light";
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: "What is the Minimum Order Quantity (MOQ) for wholesale?",
      a: "Our standard wholesale MOQ begins at 50 units for devices and 100 packs for pods. However, we offer flexibility for first-time orders to help new partners sample our inventory."
    },
    {
      q: "How long does the B2B verification process take?",
      a: "Our compliance team typically validates applications within 12 to 24 business hours. If you submit your VAT Registration (TRN) and Trade License promptly, activation is extremely fast."
    },
    {
      q: "Do you ship to other GCC countries?",
      a: "Yes, we ship wholesale products across the GCC including Saudi Arabia, Oman, Bahrain, Qatar, and Kuwait. International deliveries take 3 to 5 business days using priority express air logistics."
    },
    {
      q: "What payment methods are accepted for B2B orders?",
      a: "We support multiple secure payment gateways, including Bank Wire Transfer (AED/USD), corporate credit cards, and cash payment options at fulfillment centers in Dubai."
    },
    {
      q: "Are the products compliant with regional regulations?",
      a: "Absolutely. All devices, kits, and replacement pods we distribute are 100% genuine, ESMA approved, and labeled in compliance with Middle Eastern safety standards."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 max-w-4xl mx-auto px-6 w-full">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-black tracking-tight mb-4 font-outfit">Frequently Asked Questions</h2>
        <p className={`font-medium ${isLight ? "text-zinc-650" : "text-zinc-400"}`}>
          Got questions about our B2B procedures, MOQs, or shipping? Find answers below.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`rounded-[1.5rem] border overflow-hidden transition-all duration-300 ${
                isLight
                  ? "bg-white border-zinc-200 shadow-sm"
                  : "bg-zinc-900/30 border-white/5"
              }`}
            >
              <button
                onClick={() => toggleFAQ(idx)}
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
              >
                <span className="font-bold text-sm sm:text-base font-outfit pr-4">
                  {faq.q}
                </span>
                <span className={`shrink-0 p-1.5 rounded-full ${
                  isLight ? "bg-zinc-100 text-zinc-800" : "bg-white/5 text-white"
                }`}>
                  {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className={`px-6 pb-6 pt-2 text-sm leading-relaxed ${
                      isLight ? "text-zinc-650" : "text-zinc-400"
                    }`}>
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
