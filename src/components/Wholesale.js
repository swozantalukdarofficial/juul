"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, TrendingUp, ShieldCheck, Truck, Headphones, CheckCircle, Store, Globe, Users, ArrowRight, AlertCircle } from "lucide-react";

export default function Wholesale({ theme, shopifyPage }) {
  const isLight = theme === "light";
  
  if (shopifyPage) {
    return (
      <div className={`min-h-screen pt-32 pb-20 px-4 sm:px-6 w-full max-w-4xl mx-auto ${isLight ? "text-zinc-900" : "text-white"}`}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8 text-left"
        >
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight mb-8">
            {shopifyPage.title}
          </h1>
          <div 
            className={`shopify-page-body text-base leading-relaxed space-y-6 ${isLight ? "text-zinc-700" : "text-zinc-300"}`}
            dangerouslySetInnerHTML={{ __html: shopifyPage.body }}
          />
        </motion.div>
      </div>
    );
  }

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    businessName: "",
    email: "",
    phone: "",
    country: "UAE",
    businessType: "retail",
    monthlyVolume: "100-500",
    tradeLicense: "",
    message: ""
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
    }, 1000);
  };

  const benefits = [
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: "100% Authentic Guarantee",
      desc: "All our stock is sourced directly from manufacturers or authorized distributors. No clones, zero fakes. Your customers get only genuine JUUL products."
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Tiered Bulk Pricing",
      desc: "Maximize your margins. Our dynamic wholesale pricing structure ensures that the more you buy, the less you pay per unit, boosting your profitability."
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Express GCC Logistics",
      desc: "Priority dispatch on all B2B orders. Next-day delivery available across UAE, and express 3-5 day shipping to the broader GCC and Middle East regions."
    },
    {
      icon: <Headphones className="w-8 h-8" />,
      title: "Dedicated Account Manager",
      desc: "Get assigned a personal B2B specialist to handle your orders, provide market insights, and assist with RMA or warranty claims seamlessly."
    }
  ];

  const steps = [
    { num: "01", title: "Submit Application", desc: "Fill out the detailed business form below with your trade license details." },
    { num: "02", title: "Verification", desc: "Our B2B team will review your application and verify your business identity within 24 hours." },
    { num: "03", title: "Access Portal", desc: "Once approved, you'll receive login credentials to our dedicated wholesale ordering portal." },
    { num: "04", title: "Place Orders", desc: "Browse wholesale inventory, access tier pricing, and manage your bulk orders instantly." }
  ];

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`min-h-screen pt-32 pb-20 transition-colors duration-500 ${
        isLight ? "bg-zinc-50 text-zinc-900" : "bg-[#09090A] text-white"
      }`}
    >
      {/* HERO SECTION */}
      <div className="max-w-7xl mx-auto px-6 mb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border ${
            isLight ? "bg-blue-50 text-blue-600 border-blue-200" : "bg-emerald-900/30 text-emerald-400 border-emerald-500/30"
          }`}>
            B2B Partnership Program
          </span>
          <h1 className={`text-4xl md:text-6xl font-black tracking-tighter mb-6 ${isLight ? "text-zinc-950" : "text-white"}`}>
            Scale Your Business with <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-500 to-zinc-300 dark:from-zinc-400 dark:to-zinc-600">
              Premium Wholesale Solutions
            </span>
          </h1>
          <p className={`max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed ${isLight ? "text-zinc-600" : "text-zinc-400"}`}>
            Partner with the region's leading supplier of authentic JUUL devices and pods. Gain access to exclusive B2B pricing, priority fulfillment, and marketing support.
          </p>
        </motion.div>
      </div>

      {/* WHY PARTNER WITH US */}
      <div className={`py-20 border-y ${isLight ? "bg-white border-zinc-200" : "bg-zinc-900/30 border-white/5"}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black tracking-tight mb-4">Why Partner With Us?</h2>
            <p className={`font-medium ${isLight ? "text-zinc-600" : "text-zinc-400"}`}>Unmatched infrastructure designed to support retail and distribution at scale.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`p-8 rounded-3xl border transition-all hover:-translate-y-2 ${
                  isLight 
                    ? "bg-zinc-50 border-zinc-200 hover:shadow-xl" 
                    : "bg-zinc-900 border-white/10 hover:bg-zinc-800/80"
                }`}
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
                  isLight ? "bg-zinc-200 text-zinc-900" : "bg-zinc-800 text-white"
                }`}>
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                <p className={`text-sm leading-relaxed ${isLight ? "text-zinc-600" : "text-zinc-400"}`}>
                  {benefit.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/3">
            <h2 className="text-3xl font-black tracking-tight mb-6">Simple Onboarding Process</h2>
            <p className={`text-lg font-medium leading-relaxed mb-8 ${isLight ? "text-zinc-600" : "text-zinc-400"}`}>
              We've streamlined our onboarding so you can start placing bulk orders in less than 24 hours. Our automated portal handles everything from invoices to tracking.
            </p>
            <div className={`p-6 rounded-2xl border flex items-start gap-4 ${isLight ? "bg-amber-50 border-amber-200" : "bg-amber-900/10 border-amber-500/20"}`}>
              <AlertCircle className={`w-6 h-6 shrink-0 ${isLight ? "text-amber-600" : "text-amber-500"}`} />
              <div>
                <h4 className={`font-bold ${isLight ? "text-amber-900" : "text-amber-400"}`}>Trade License Required</h4>
                <p className={`text-sm mt-1 ${isLight ? "text-amber-700" : "text-amber-500/80"}`}>
                  To access wholesale pricing, you must provide a valid business registration or trade license during application.
                </p>
              </div>
            </div>
          </div>
          
          <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
            {steps.map((step, i) => (
              <div key={i} className={`p-8 rounded-3xl border relative overflow-hidden ${
                isLight ? "bg-white border-zinc-200" : "bg-zinc-900/50 border-white/10"
              }`}>
                <span className={`text-8xl font-black absolute -bottom-6 -right-4 opacity-5 ${
                  isLight ? "text-zinc-900" : "text-white"
                }`}>
                  {step.num}
                </span>
                <h4 className="text-xl font-bold mb-3 relative z-10">{step.num}. {step.title}</h4>
                <p className={`text-sm leading-relaxed relative z-10 ${isLight ? "text-zinc-600" : "text-zinc-400"}`}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* APPLICATION FORM */}
      <div className="max-w-4xl mx-auto px-6" id="apply">
        <div className={`p-8 md:p-12 rounded-[2.5rem] border shadow-2xl ${
          isLight ? "bg-white border-zinc-200" : "bg-zinc-900 border-white/10"
        }`}>
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black tracking-tight mb-3">Wholesale Application</h2>
            <p className={`font-medium ${isLight ? "text-zinc-600" : "text-zinc-400"}`}>
              Fill out the form below. Our B2B team will contact you shortly.
            </p>
          </div>

          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16 space-y-6"
              >
                <div className="w-24 h-24 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-12 h-12" />
                </div>
                <h3 className="text-3xl font-black">Application Received!</h3>
                <p className={`text-lg max-w-md mx-auto ${isLight ? "text-zinc-600" : "text-zinc-400"}`}>
                  Thank you for your interest. Our wholesale team is reviewing your details and will contact you via email within 24 hours.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className={`mt-8 font-bold text-sm tracking-widest uppercase ${
                    isLight ? "text-blue-600 hover:text-blue-700" : "text-emerald-400 hover:text-emerald-300"
                  }`}
                >
                  Submit Another Application
                </button>
              </motion.div>
            ) : (
              <motion.form 
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onSubmit={handleSubmit} 
                className="space-y-6"
              >
                {/* Name Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className={`text-xs font-bold uppercase tracking-wider ${isLight ? "text-zinc-500" : "text-zinc-400"}`}>First Name *</label>
                    <input 
                      type="text" required name="firstName" value={formData.firstName} onChange={handleChange}
                      className={`w-full px-5 py-4 rounded-xl border focus:outline-none focus:ring-2 transition-all ${
                        isLight 
                          ? "bg-zinc-50 border-zinc-200 focus:ring-blue-500 focus:border-blue-500" 
                          : "bg-black/50 border-white/10 focus:ring-emerald-500 focus:border-emerald-500 text-white placeholder-zinc-600"
                      }`}
                      placeholder="John"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={`text-xs font-bold uppercase tracking-wider ${isLight ? "text-zinc-500" : "text-zinc-400"}`}>Last Name *</label>
                    <input 
                      type="text" required name="lastName" value={formData.lastName} onChange={handleChange}
                      className={`w-full px-5 py-4 rounded-xl border focus:outline-none focus:ring-2 transition-all ${
                        isLight 
                          ? "bg-zinc-50 border-zinc-200 focus:ring-blue-500 focus:border-blue-500" 
                          : "bg-black/50 border-white/10 focus:ring-emerald-500 focus:border-emerald-500 text-white placeholder-zinc-600"
                      }`}
                      placeholder="Doe"
                    />
                  </div>
                </div>

                {/* Business Info Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className={`text-xs font-bold uppercase tracking-wider ${isLight ? "text-zinc-500" : "text-zinc-400"}`}>Business Name *</label>
                    <input 
                      type="text" required name="businessName" value={formData.businessName} onChange={handleChange}
                      className={`w-full px-5 py-4 rounded-xl border focus:outline-none focus:ring-2 transition-all ${
                        isLight 
                          ? "bg-zinc-50 border-zinc-200 focus:ring-blue-500 focus:border-blue-500" 
                          : "bg-black/50 border-white/10 focus:ring-emerald-500 focus:border-emerald-500 text-white placeholder-zinc-600"
                      }`}
                      placeholder="e.g. Vape Oasis LLC"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={`text-xs font-bold uppercase tracking-wider ${isLight ? "text-zinc-500" : "text-zinc-400"}`}>Trade License / TRN *</label>
                    <input 
                      type="text" required name="tradeLicense" value={formData.tradeLicense} onChange={handleChange}
                      className={`w-full px-5 py-4 rounded-xl border focus:outline-none focus:ring-2 transition-all ${
                        isLight 
                          ? "bg-zinc-50 border-zinc-200 focus:ring-blue-500 focus:border-blue-500" 
                          : "bg-black/50 border-white/10 focus:ring-emerald-500 focus:border-emerald-500 text-white placeholder-zinc-600"
                      }`}
                      placeholder="License or Tax Registration Number"
                    />
                  </div>
                </div>

                {/* Contact Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className={`text-xs font-bold uppercase tracking-wider ${isLight ? "text-zinc-500" : "text-zinc-400"}`}>Business Email *</label>
                    <input 
                      type="email" required name="email" value={formData.email} onChange={handleChange}
                      className={`w-full px-5 py-4 rounded-xl border focus:outline-none focus:ring-2 transition-all ${
                        isLight 
                          ? "bg-zinc-50 border-zinc-200 focus:ring-blue-500 focus:border-blue-500" 
                          : "bg-black/50 border-white/10 focus:ring-emerald-500 focus:border-emerald-500 text-white placeholder-zinc-600"
                      }`}
                      placeholder="john@business.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={`text-xs font-bold uppercase tracking-wider ${isLight ? "text-zinc-500" : "text-zinc-400"}`}>Phone Number *</label>
                    <input 
                      type="tel" required name="phone" value={formData.phone} onChange={handleChange}
                      className={`w-full px-5 py-4 rounded-xl border focus:outline-none focus:ring-2 transition-all ${
                        isLight 
                          ? "bg-zinc-50 border-zinc-200 focus:ring-blue-500 focus:border-blue-500" 
                          : "bg-black/50 border-white/10 focus:ring-emerald-500 focus:border-emerald-500 text-white placeholder-zinc-600"
                      }`}
                      placeholder="+971 50 123 4567"
                    />
                  </div>
                </div>

                {/* Dropdowns Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className={`text-xs font-bold uppercase tracking-wider ${isLight ? "text-zinc-500" : "text-zinc-400"}`}>Business Type</label>
                    <select 
                      name="businessType" value={formData.businessType} onChange={handleChange}
                      className={`w-full px-5 py-4 rounded-xl border focus:outline-none focus:ring-2 transition-all appearance-none cursor-pointer ${
                        isLight 
                          ? "bg-zinc-50 border-zinc-200 focus:ring-blue-500" 
                          : "bg-black/50 border-white/10 focus:ring-emerald-500 text-white"
                      }`}
                    >
                      <option value="retail">Retail Shop (Physical)</option>
                      <option value="online">Online Store (E-commerce)</option>
                      <option value="distributor">Distributor / Wholesaler</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className={`text-xs font-bold uppercase tracking-wider ${isLight ? "text-zinc-500" : "text-zinc-400"}`}>Est. Monthly Volume</label>
                    <select 
                      name="monthlyVolume" value={formData.monthlyVolume} onChange={handleChange}
                      className={`w-full px-5 py-4 rounded-xl border focus:outline-none focus:ring-2 transition-all appearance-none cursor-pointer ${
                        isLight 
                          ? "bg-zinc-50 border-zinc-200 focus:ring-blue-500" 
                          : "bg-black/50 border-white/10 focus:ring-emerald-500 text-white"
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
                  <label className={`text-xs font-bold uppercase tracking-wider ${isLight ? "text-zinc-500" : "text-zinc-400"}`}>Additional Details / Target Brands</label>
                  <textarea 
                    name="message" value={formData.message} onChange={handleChange} rows="4"
                    className={`w-full px-5 py-4 rounded-xl border focus:outline-none focus:ring-2 transition-all resize-none ${
                      isLight 
                        ? "bg-zinc-50 border-zinc-200 focus:ring-blue-500 focus:border-blue-500" 
                        : "bg-black/50 border-white/10 focus:ring-emerald-500 focus:border-emerald-500 text-white placeholder-zinc-600"
                    }`}
                    placeholder="Tell us about the specific products you're interested in..."
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className={`w-full py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 ${
                    isLight 
                      ? "bg-zinc-950 text-white hover:bg-zinc-800 shadow-xl" 
                      : "bg-white text-zinc-950 hover:bg-zinc-200 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                  }`}
                >
                  Submit Application <ArrowRight className="w-4 h-4" />
                </button>
                <p className={`text-xs text-center mt-4 ${isLight ? "text-zinc-500" : "text-zinc-500"}`}>
                  By submitting this form, you agree to our B2B Terms of Service and Privacy Policy.
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
}
