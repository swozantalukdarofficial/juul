"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";

export default function WholesaleForm({ theme }) {
  const isLight = theme === "light";

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    businessName: "",
    email: "",
    phone: "",
    businessType: "retail",
    monthlyVolume: "100-500",
    tradeLicense: "",
    message: ""
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate B2B API dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  return (
    <section className="py-24 max-w-4xl mx-auto px-6 w-full" id="apply">
      <div className={`p-8 md:p-12 rounded-[2.5rem] border shadow-2xl transition-colors duration-500 ${
        isLight ? "bg-white border-zinc-200" : "bg-[#09090A] border-white/10"
      }`}>
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black tracking-tight mb-4 font-outfit">Wholesale Application</h2>
          <p className={`font-medium ${isLight ? "text-zinc-600" : "text-zinc-400"}`}>
            Submit your retail or distribution details below. Our wholesale department will contact you within 24 hours.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {isSubmitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-16 space-y-6"
            >
              <div className="w-20 h-20 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-3xl font-black font-outfit">Application Received</h3>
              <p className={`text-base max-w-md mx-auto ${isLight ? "text-zinc-650" : "text-zinc-400"}`}>
                Thank you for your interest. A VAPEPODS B2B manager will verify your commercial details and reach out to complete your wholesale account activation.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="mt-8 font-black text-xs tracking-widest uppercase text-emerald-500 hover:text-emerald-600 transition-colors"
              >
                Submit Another Application
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {/* Name Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className={`text-xs font-black uppercase tracking-wider ${isLight ? "text-zinc-550" : "text-zinc-450"}`}>First Name *</label>
                  <input
                    type="text" required name="firstName" value={formData.firstName} onChange={handleChange}
                    className={`w-full px-5 py-4 rounded-xl border focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all ${
                      isLight
                        ? "bg-zinc-50 border-zinc-200 text-zinc-900"
                        : "bg-black/50 border-white/10 text-white placeholder-zinc-600"
                    }`}
                    placeholder="John"
                  />
                </div>
                <div className="space-y-2">
                  <label className={`text-xs font-black uppercase tracking-wider ${isLight ? "text-zinc-550" : "text-zinc-450"}`}>Last Name *</label>
                  <input
                    type="text" required name="lastName" value={formData.lastName} onChange={handleChange}
                    className={`w-full px-5 py-4 rounded-xl border focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all ${
                      isLight
                        ? "bg-zinc-50 border-zinc-200 text-zinc-900"
                        : "bg-black/50 border-white/10 text-white placeholder-zinc-600"
                    }`}
                    placeholder="Doe"
                  />
                </div>
              </div>

              {/* Business Info Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className={`text-xs font-black uppercase tracking-wider ${isLight ? "text-zinc-550" : "text-zinc-450"}`}>Business Name *</label>
                  <input
                    type="text" required name="businessName" value={formData.businessName} onChange={handleChange}
                    className={`w-full px-5 py-4 rounded-xl border focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all ${
                      isLight
                        ? "bg-zinc-50 border-zinc-200 text-zinc-900"
                        : "bg-black/50 border-white/10 text-white placeholder-zinc-600"
                    }`}
                    placeholder="Vape Emporium LLC"
                  />
                </div>
                <div className="space-y-2">
                  <label className={`text-xs font-black uppercase tracking-wider ${isLight ? "text-zinc-550" : "text-zinc-450"}`}>Trade License / TRN *</label>
                  <input
                    type="text" required name="tradeLicense" value={formData.tradeLicense} onChange={handleChange}
                    className={`w-full px-5 py-4 rounded-xl border focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all ${
                      isLight
                        ? "bg-zinc-50 border-zinc-200 text-zinc-900"
                        : "bg-black/50 border-white/10 text-white placeholder-zinc-600"
                    }`}
                    placeholder="Commercial ID or VAT license"
                  />
                </div>
              </div>

              {/* Contact Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className={`text-xs font-black uppercase tracking-wider ${isLight ? "text-zinc-550" : "text-zinc-450"}`}>Business Email *</label>
                  <input
                    type="email" required name="email" value={formData.email} onChange={handleChange}
                    className={`w-full px-5 py-4 rounded-xl border focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all ${
                      isLight
                        ? "bg-zinc-50 border-zinc-200 text-zinc-900"
                        : "bg-black/50 border-white/10 text-white placeholder-zinc-600"
                    }`}
                    placeholder="procurement@vapeemporium.com"
                  />
                </div>
                <div className="space-y-2">
                  <label className={`text-xs font-black uppercase tracking-wider ${isLight ? "text-zinc-550" : "text-zinc-450"}`}>Phone Number *</label>
                  <input
                    type="tel" required name="phone" value={formData.phone} onChange={handleChange}
                    className={`w-full px-5 py-4 rounded-xl border focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all ${
                      isLight
                        ? "bg-zinc-50 border-zinc-200 text-zinc-900"
                        : "bg-black/50 border-white/10 text-white placeholder-zinc-600"
                    }`}
                    placeholder="+971 50 000 0000"
                  />
                </div>
              </div>

              {/* Dropdowns Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className={`text-xs font-black uppercase tracking-wider ${isLight ? "text-zinc-550" : "text-zinc-450"}`}>Business Type</label>
                  <select
                    name="businessType" value={formData.businessType} onChange={handleChange}
                    className={`w-full px-5 py-4 rounded-xl border focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all appearance-none cursor-pointer ${
                      isLight
                        ? "bg-zinc-50 border-zinc-200 text-zinc-900"
                        : "bg-black/50 border-white/10 text-white"
                    }`}
                  >
                    <option value="retail">Retail Shop (Physical)</option>
                    <option value="online">Online Store (E-commerce)</option>
                    <option value="distributor">Distributor / Wholesaler</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className={`text-xs font-black uppercase tracking-wider ${isLight ? "text-zinc-550" : "text-zinc-450"}`}>Est. Monthly Volume</label>
                  <select
                    name="monthlyVolume" value={formData.monthlyVolume} onChange={handleChange}
                    className={`w-full px-5 py-4 rounded-xl border focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all appearance-none cursor-pointer ${
                      isLight
                        ? "bg-zinc-50 border-zinc-200 text-zinc-900"
                        : "bg-black/50 border-white/10 text-white"
                    }`}
                  >
                    <option value="under-100">Under 100 units/mo</option>
                    <option value="100-500">100 - 500 units/mo</option>
                    <option value="500-2000">500 - 2,000 units/mo</option>
                    <option value="2000-plus">2,000+ units/mo</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className={`text-xs font-black uppercase tracking-wider ${isLight ? "text-zinc-550" : "text-zinc-450"}`}>Additional Details / Target Products</label>
                <textarea
                  name="message" value={formData.message} onChange={handleChange} rows="4"
                  className={`w-full px-5 py-4 rounded-xl border focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all resize-none ${
                    isLight
                      ? "bg-zinc-50 border-zinc-200 text-zinc-900"
                      : "bg-black/50 border-white/10 text-white placeholder-zinc-600"
                  }`}
                  placeholder="Mention target quantities and device requirements..."
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 ${
                  isLight
                    ? "bg-zinc-950 text-white hover:bg-emerald-500 shadow-xl hover:shadow-emerald-500/20"
                    : "bg-white text-zinc-950 hover:bg-emerald-500 hover:text-white shadow-[0_0_20px_rgba(16,185,129,0.15)]"
                } disabled:opacity-50`}
              >
                {isSubmitting ? "Submitting..." : "Submit Inquiry"} <ArrowRight className="w-4 h-4" />
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
