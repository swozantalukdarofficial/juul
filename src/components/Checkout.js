"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CreditCard, Truck, ShieldCheck, CheckCircle2, ShoppingBag, ArrowRight } from "lucide-react";

export default function Checkout({ cart, onClearCart, setCurrentPage, theme }) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    address: "",
    city: "",
    zip: "",
    cardNum: "",
    cardExpiry: "",
    cardCvc: ""
  });

  const isLight = theme === "light";

  const subtotal = cart.reduce((sum, item) => sum + parseFloat(item.price), 0);
  const shipping = subtotal > 0 ? 4.99 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const toDhs = (price) => {
    return (parseFloat(price) * 4.725).toFixed(2);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call and clear checkout
    setIsSuccess(true);
  };

  const handleSuccessClose = () => {
    onClearCart();
    setCurrentPage("home");
  };

  if (isSuccess) {
    return (
      <motion.section 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={`pt-32 pb-20 min-h-screen flex items-center justify-center text-center transition-colors duration-500 ${
          isLight ? "bg-zinc-50 text-zinc-900" : "bg-[#09090A] text-white"
        }`}
      >
        <div className={`max-w-md w-full mx-auto px-6 py-12 rounded-3xl border relative overflow-hidden space-y-6 transition-colors duration-500 ${
          isLight ? "bg-white border-zinc-200 shadow-xl" : "bg-zinc-950 border-white/5 shadow-2xl"
        }`}>
          <div className="absolute inset-0 bg-emerald-500/[0.02] blur-3xl pointer-events-none" />
          
          {/* Animated check circle */}
          <div className="flex justify-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className={`w-20 h-20 rounded-full flex items-center justify-center ${
                isLight ? "bg-blue-50 border border-blue-200 text-blue-600" : "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"
              }`}
            >
              <CheckCircle2 className="w-10 h-10" />
            </motion.div>
          </div>

          <div className="space-y-2">
            <h1 className={`text-2xl font-black uppercase tracking-wider ${isLight ? "text-zinc-950" : "text-white"}`}>
              Order Confirmed
            </h1>
            <p className={`text-sm font-light max-w-sm mx-auto ${isLight ? "text-zinc-500" : "text-zinc-400"}`}>
              Thank you for choosing JUUL. Your payment was processed successfully. A confirmation email has been sent.
            </p>
          </div>

          {/* Dummy Order Ref */}
          <div className={`border rounded-2xl p-4 text-left space-y-2 text-xs ${
            isLight ? "bg-zinc-50 border-zinc-200" : "bg-white/5 border-white/10"
          }`}>
            <div className="flex justify-between"><span className="text-zinc-500 font-medium">Order Number</span><span className={`font-bold ${isLight ? "text-zinc-900" : "text-white"}`}>#JL-9938210</span></div>
            <div className="flex justify-between"><span className="text-zinc-500 font-medium">Estimated Delivery</span><span className={`font-bold ${isLight ? "text-zinc-900" : "text-white"}`}>2 - 3 Business Days</span></div>
          </div>

          <button
            onClick={handleSuccessClose}
            className={`w-full font-bold uppercase tracking-widest text-xs py-4 rounded-full transition-all cursor-pointer ${
              isLight 
                ? "bg-zinc-950 hover:bg-zinc-800 text-white shadow-md shadow-zinc-950/10" 
                : "bg-emerald-400 hover:bg-emerald-300 text-black shadow-emerald-400/20"
            }`}
          >
            Return Home
          </button>
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`pt-32 pb-20 min-h-screen text-left transition-colors duration-500 ${
        isLight ? "bg-zinc-50 text-zinc-900" : "bg-[#09090A] text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="space-y-3 mb-12">
          <span className={`text-xs font-bold uppercase tracking-widest ${isLight ? "text-blue-600" : "text-emerald-400"}`}>
            Secure Gateway
          </span>
          <h1 className={`text-3xl sm:text-5xl font-black tracking-tight ${isLight ? "text-zinc-950" : "text-white"}`}>
            Checkout
          </h1>
        </div>

        {cart.length === 0 ? (
          <div className={`text-center py-20 border rounded-3xl space-y-6 ${
            isLight ? "bg-white border-zinc-200 shadow-sm" : "bg-zinc-950/40 border-white/5"
          }`}>
            <ShoppingBag className={`w-16 h-16 mx-auto ${isLight ? "text-zinc-300" : "text-zinc-600"}`} />
            <h3 className={`text-xl font-bold ${isLight ? "text-zinc-800" : "text-white"}`}>Your Cart is Empty</h3>
            <p className={`text-sm font-light max-w-sm mx-auto ${isLight ? "text-zinc-500" : "text-zinc-400"}`}>
              Please browse our collections or customize a JUUL vape to begin checking out.
            </p>
            <button
              onClick={() => setCurrentPage("collection")}
              className={`font-bold uppercase tracking-widest text-xs px-8 py-4 rounded-full transition-colors cursor-pointer ${
                isLight 
                  ? "bg-zinc-950 hover:bg-zinc-800 text-white shadow-md shadow-zinc-950/10" 
                  : "bg-white/5 hover:bg-emerald-400 hover:text-black text-white border border-white/10"
              }`}
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Billing Info Form */}
            <form onSubmit={handleSubmit} className={`lg:col-span-7 border rounded-3xl p-6 sm:p-8 space-y-6 ${
              isLight ? "bg-white border-zinc-200 shadow-sm" : "bg-zinc-950/40 border-white/5"
            }`}>
              <div className={`flex items-center gap-2 border-b pb-4 ${isLight ? "border-zinc-100" : "border-white/5"}`}>
                <Truck className={`w-5 h-5 ${isLight ? "text-blue-600" : "text-emerald-400"}`} />
                <h3 className={`text-lg font-black uppercase tracking-wider ${isLight ? "text-zinc-850" : "text-white"}`}>Shipping Details</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 text-left">
                  <label htmlFor="checkout-name" className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">Full Name</label>
                  <input
                    id="checkout-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="John Doe"
                    className={`w-full text-xs px-4 py-3 rounded-full outline-none transition-colors border ${
                      isLight 
                        ? "bg-zinc-50 border-zinc-200 focus:border-blue-600 text-zinc-900 placeholder:text-zinc-400" 
                        : "bg-white/5 border-white/10 focus:border-emerald-400 text-white"
                    }`}
                  />
                </div>
                <div className="space-y-1.5 text-left">
                  <label htmlFor="checkout-email" className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">Email Address</label>
                  <input
                    id="checkout-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="john@example.com"
                    className={`w-full text-xs px-4 py-3 rounded-full outline-none transition-colors border ${
                      isLight 
                        ? "bg-zinc-50 border-zinc-200 focus:border-blue-600 text-zinc-900 placeholder:text-zinc-400" 
                        : "bg-white/5 border-white/10 focus:border-emerald-400 text-white"
                    }`}
                  />
                </div>
              </div>

              <div className="space-y-1.5 text-left">
                <label htmlFor="checkout-address" className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">Street Address</label>
                <input
                  id="checkout-address"
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  placeholder="123 Vapor Lane"
                  className={`w-full text-xs px-4 py-3 rounded-full outline-none transition-colors border ${
                    isLight 
                      ? "bg-zinc-50 border-zinc-200 focus:border-blue-600 text-zinc-900 placeholder:text-zinc-400" 
                      : "bg-white/5 border-white/10 focus:border-emerald-400 text-white"
                  }`}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 text-left">
                  <label htmlFor="checkout-city" className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">City</label>
                  <input
                    id="checkout-city"
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    placeholder="New York"
                    className={`w-full text-xs px-4 py-3 rounded-full outline-none transition-colors border ${
                      isLight 
                        ? "bg-zinc-50 border-zinc-200 focus:border-blue-600 text-zinc-900 placeholder:text-zinc-400" 
                        : "bg-white/5 border-white/10 focus:border-emerald-400 text-white"
                    }`}
                  />
                </div>
                <div className="space-y-1.5 text-left">
                  <label htmlFor="checkout-zip" className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">Postal / ZIP Code</label>
                  <input
                    id="checkout-zip"
                    type="text"
                    name="zip"
                    value={formData.zip}
                    onChange={handleInputChange}
                    required
                    placeholder="10001"
                    className={`w-full text-xs px-4 py-3 rounded-full outline-none transition-colors border ${
                      isLight 
                        ? "bg-zinc-50 border-zinc-200 focus:border-blue-600 text-zinc-900 placeholder:text-zinc-400" 
                        : "bg-white/5 border-white/10 focus:border-emerald-400 text-white"
                    }`}
                  />
                </div>
              </div>

              <div className={`flex items-center gap-2 border-b pb-4 pt-6 ${isLight ? "border-zinc-100" : "border-white/5"}`}>
                <CreditCard className={`w-5 h-5 ${isLight ? "text-blue-600" : "text-emerald-400"}`} />
                <h3 className={`text-lg font-black uppercase tracking-wider ${isLight ? "text-zinc-850" : "text-white"}`}>Payment</h3>
              </div>

              <div className="space-y-1.5 text-left">
                <label htmlFor="checkout-cardnum" className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">Card Number</label>
                <input
                  id="checkout-cardnum"
                  type="text"
                  name="cardNum"
                  value={formData.cardNum}
                  onChange={handleInputChange}
                  required
                  placeholder="4000 1234 5678 9010"
                  className={`w-full text-xs px-4 py-3 rounded-full outline-none transition-colors border ${
                    isLight 
                      ? "bg-zinc-50 border-zinc-200 focus:border-blue-600 text-zinc-900 placeholder:text-zinc-400" 
                      : "bg-white/5 border-white/10 focus:border-emerald-400 text-white"
                  }`}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 text-left">
                  <label htmlFor="checkout-expiry" className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">Expiration Date</label>
                  <input
                    id="checkout-expiry"
                    type="text"
                    name="cardExpiry"
                    value={formData.cardExpiry}
                    onChange={handleInputChange}
                    required
                    placeholder="MM/YY"
                    className={`w-full text-xs px-4 py-3 rounded-full outline-none transition-colors border ${
                      isLight 
                        ? "bg-zinc-50 border-zinc-200 focus:border-blue-600 text-zinc-900 placeholder:text-zinc-400" 
                        : "bg-white/5 border-white/10 focus:border-emerald-400 text-white"
                  }`}
                  />
                </div>
                <div className="space-y-1.5 text-left">
                  <label htmlFor="checkout-cvc" className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">CVC Security Code</label>
                  <input
                    id="checkout-cvc"
                    type="text"
                    name="cardCvc"
                    value={formData.cardCvc}
                    onChange={handleInputChange}
                    required
                    placeholder="123"
                    className={`w-full text-xs px-4 py-3 rounded-full outline-none transition-colors border ${
                      isLight 
                        ? "bg-zinc-50 border-zinc-200 focus:border-blue-600 text-zinc-900 placeholder:text-zinc-400" 
                        : "bg-white/5 border-white/10 focus:border-emerald-400 text-white"
                    }`}
                  />
                </div>
              </div>

              <button
                type="submit"
                className={`w-full font-black uppercase tracking-widest text-xs py-4 rounded-full transition-all flex items-center justify-center gap-2 transform hover:scale-[1.01] mt-8 cursor-pointer ${
                  isLight 
                    ? "bg-zinc-950 hover:bg-zinc-800 text-white shadow-md shadow-zinc-950/10" 
                    : "bg-emerald-400 hover:bg-emerald-300 text-black shadow-emerald-500/20"
                }`}
              >
                Complete Payment Securely <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Right: Order Summary Panel */}
            <div className={`lg:col-span-5 border rounded-3xl p-6 sm:p-8 space-y-6 ${
              isLight ? "bg-white border-zinc-200 shadow-sm" : "bg-zinc-950/40 border-white/5"
            }`}>
              <div className={`flex items-center gap-2 border-b pb-4 ${isLight ? "border-zinc-100" : "border-white/5"}`}>
                <ShoppingBag className={`w-5 h-5 ${isLight ? "text-blue-600" : "text-emerald-400"}`} />
                <h3 className={`text-lg font-black uppercase tracking-wider ${isLight ? "text-zinc-850" : "text-white"}`}>Summary</h3>
              </div>

              {/* Items List */}
              <div className="max-h-60 overflow-y-auto space-y-4 pr-2">
                {cart.map((item, index) => (
                  <div key={index} className="flex justify-between items-center text-xs">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-6 h-6 rounded-full flex-shrink-0"
                        style={{ backgroundColor: `${item.imgColor || '#4B5563'}40` }}
                      />
                      <div className="text-left">
                        <p className={`font-bold line-clamp-1 ${isLight ? "text-zinc-850" : "text-white"}`}>{item.name}</p>
                        {item.customDetails && (
                          <p className="text-[10px] text-zinc-500 font-medium">
                            {item.customDetails.color} | Nic: {item.customDetails.nicotine}
                          </p>
                        )}
                      </div>
                    </div>
                    <span className={`font-bold ${isLight ? "text-zinc-900" : "text-white"}`}>Dhs. {toDhs(item.price)}</span>
                  </div>
                ))}
              </div>

              {/* Totals Table */}
              <div className={`pt-4 border-t space-y-2 text-xs ${isLight ? "border-zinc-100 text-zinc-800" : "border-white/5 text-white"}`}>
                <div className="flex justify-between"><span className="text-zinc-500 font-medium">Subtotal</span><span className={`font-bold ${isLight ? "text-zinc-900" : "text-white"}`}>Dhs. {toDhs(subtotal)}</span></div>
                <div className="flex justify-between"><span className="text-zinc-500 font-medium">Estimated Shipping</span><span className={`font-bold ${isLight ? "text-zinc-900" : "text-white"}`}>Dhs. {toDhs(shipping)}</span></div>
                <div className="flex justify-between"><span className="text-zinc-500 font-medium">Taxes (8%)</span><span className={`font-bold ${isLight ? "text-zinc-900" : "text-white"}`}>Dhs. {toDhs(tax)}</span></div>
                <div className={`flex justify-between pt-4 border-t text-sm font-black ${isLight ? "border-zinc-100" : "border-white/5"}`}>
                  <span className={`uppercase tracking-wider ${isLight ? "text-zinc-900" : "text-white"}`}>Order Total</span>
                  <span className={`font-black ${isLight ? "text-blue-600" : "text-emerald-400"}`}>Dhs. {toDhs(total)}</span>
                </div>
              </div>

              {/* Secure checkout info */}
              <div className={`border rounded-2xl p-4 flex items-start gap-3 transition-colors ${
                isLight ? "bg-zinc-50 border-zinc-200" : "bg-white/[0.01] border-white/5"
              }`}>
                <ShieldCheck className={`w-5 h-5 flex-shrink-0 ${isLight ? "text-blue-600" : "text-emerald-400"}`} />
                <div className="text-left space-y-1">
                  <p className={`text-[10px] uppercase font-bold tracking-widest ${isLight ? "text-zinc-800" : "text-white"}`}>Industry Grade SSL</p>
                  <p className="text-[10px] text-zinc-500 font-light leading-relaxed">
                    Payments are 256-bit encrypted. Age verification is automatically validated with state database registries.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.section>
  );
}
