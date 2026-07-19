"use client";

import { motion } from "framer-motion";
import { ShieldCheck, AlertCircle, FileText, CheckCircle } from "lucide-react";

export default function WholesaleCompliance({ theme }) {
  const isLight = theme === "light";

  return (
    <section className={`py-24 border-y transition-colors duration-500 ${isLight ? "bg-zinc-100/50 border-zinc-200" : "bg-[#0A0A0C]/50 border-white/5"}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-emerald-500/10 text-emerald-500 rounded-md mb-6 inline-block">
              Regulatory Standards
            </span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6 font-outfit">
              100% Compliant & Verified Operations
            </h2>
            <p className={`text-base sm:text-lg leading-relaxed mb-6 ${isLight ? "text-zinc-600" : "text-zinc-400"}`}>
              VAPEPODS operates in absolute compliance with UAE and regional standards. All products in our catalog hold certifications from ESMA and local health authorities, ensuring hassle-free distribution for your business.
            </p>
            <p className={`text-base sm:text-lg leading-relaxed ${isLight ? "text-zinc-600" : "text-zinc-400"}`}>
              We support clean, legal digital retail and only partner with registered business entities who hold valid commercial registrations in their respective countries.
            </p>
          </div>

          <div className="space-y-6">
            <div className={`p-6 rounded-2xl border flex items-start gap-4 transition-transform hover:scale-[1.01] ${
              isLight ? "bg-white border-zinc-200 shadow-sm" : "bg-zinc-900/60 border-white/10"
            }`}>
              <FileText className="w-6 h-6 text-emerald-500 shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-lg font-outfit mb-1">Valid Trade License Required</h4>
                <p className={`text-sm ${isLight ? "text-zinc-550" : "text-zinc-400"}`}>
                  Commercial registration or trade licenses are verified before B2B account onboarding.
                </p>
              </div>
            </div>

            <div className={`p-6 rounded-2xl border flex items-start gap-4 transition-transform hover:scale-[1.01] ${
              isLight ? "bg-white border-zinc-200 shadow-sm" : "bg-zinc-900/60 border-white/10"
            }`}>
              <ShieldCheck className="w-6 h-6 text-emerald-500 shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-lg font-outfit mb-1">GCC Custom Compliant (TRN)</h4>
                <p className={`text-sm ${isLight ? "text-zinc-550" : "text-zinc-400"}`}>
                  VAT Tax Registration Numbers are required to access tax-compliant bulk invoices.
                </p>
              </div>
            </div>

            <div className={`p-6 rounded-2xl border flex items-start gap-4 transition-transform hover:scale-[1.01] ${
              isLight ? "bg-white border-zinc-200 shadow-sm" : "bg-zinc-900/60 border-white/10"
            }`}>
              <AlertCircle className="w-6 h-6 text-emerald-500 shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-lg font-outfit mb-1">Age Gate Enforcement (18+)</h4>
                <p className={`text-sm ${isLight ? "text-zinc-550" : "text-zinc-400"}`}>
                  We strictly verify that B2B purchasers only retail to individuals above the legal vaping age.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
