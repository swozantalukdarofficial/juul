"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Truck, ShieldCheck, CheckCircle2, ShoppingBag, ArrowRight, Wallet, Check } from "lucide-react";

export default function Checkout({ cart, onClearCart, setCurrentPage, theme }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdOrder, setCreatedOrder] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [transactionId, setTransactionId] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    address: "",
    city: ""
  });

  const isLight = theme === "light";

  const subtotal = cart.reduce((sum, item) => sum + parseFloat(item.price), 0);
  const shipping = subtotal > 0 ? 5.00 : 0;
  const total = subtotal + shipping;

  const toBdt = (price) => {
    return (parseFloat(price) * 32.5).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    if ((paymentMethod === "bKash" || paymentMethod === "Nagad") && !transactionId) {
      alert("Please enter your mobile banking Transaction ID.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.email, // using email field as phone number input
          address: formData.address,
          city: formData.city,
          paymentMethod,
          transactionId: paymentMethod !== "COD" ? transactionId : null,
          cartItems: cart
        })
      });

      const resBody = await response.json();

      if (response.ok && resBody.success) {
        setCreatedOrder(resBody.order);
      } else {
        const errMsg = typeof resBody.error === 'string' ? resBody.error : JSON.stringify(resBody.error);
        alert(errMsg || "Failed to place your order. Please try again.");
      }
    } catch (err) {
      console.error("Checkout submission error:", err);
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSuccessClose = () => {
    onClearCart();
    setCurrentPage("home");
  };

  if (createdOrder) {
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
              Order Placed!
            </h1>
            <p className={`text-sm font-light max-w-sm mx-auto ${isLight ? "text-zinc-500" : "text-zinc-400"}`}>
              Thank you for your order. We are processing it and will contact you shortly to confirm shipment.
            </p>
          </div>

          <div className={`border rounded-2xl p-4 text-left space-y-2 text-xs ${
            isLight ? "bg-zinc-50 border-zinc-200" : "bg-white/5 border-white/10"
          }`}>
            <div className="flex justify-between">
              <span className="text-zinc-500 font-medium">Order Number</span>
              <span className={`font-bold ${isLight ? "text-zinc-900" : "text-white"}`}>{createdOrder.name || `#${createdOrder.id}`}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500 font-medium">Customer Phone</span>
              <span className={`font-bold ${isLight ? "text-zinc-900" : "text-white"}`}>{createdOrder.customer?.phone || "N/A"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500 font-medium">Estimated Delivery</span>
              <span className={`font-bold ${isLight ? "text-zinc-900" : "text-white"}`}>2 - 4 Business Days</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500 font-medium">Payment Mode</span>
              <span className={`font-bold uppercase ${isLight ? "text-zinc-900" : "text-white"}`}>{paymentMethod}</span>
            </div>
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
            Custom Checkout
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
              Please browse our collections to begin checking out.
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
                <h3 className={`text-lg font-black uppercase tracking-wider ${isLight ? "text-zinc-850" : "text-white"}`}>Shipping & Contact</h3>
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
                    placeholder="Enter your name"
                    className={`w-full text-xs px-4 py-3 rounded-full outline-none transition-colors border ${
                      isLight 
                        ? "bg-zinc-50 border-zinc-200 focus:border-blue-600 text-zinc-900 placeholder:text-zinc-400" 
                        : "bg-white/5 border-white/10 focus:border-emerald-400 text-white"
                    }`}
                  />
                </div>
                <div className="space-y-1.5 text-left">
                  <label htmlFor="checkout-phone" className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">Phone Number</label>
                  <input
                    id="checkout-phone"
                    type="tel"
                    name="email" // using email state for phone input
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g. 01712345678"
                    className={`w-full text-xs px-4 py-3 rounded-full outline-none transition-colors border ${
                      isLight 
                        ? "bg-zinc-50 border-zinc-200 focus:border-blue-600 text-zinc-900 placeholder:text-zinc-400" 
                        : "bg-white/5 border-white/10 focus:border-emerald-400 text-white"
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 text-left">
                  <label htmlFor="checkout-address" className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">Delivery Address</label>
                  <input
                    id="checkout-address"
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    placeholder="House/Road details"
                    className={`w-full text-xs px-4 py-3 rounded-full outline-none transition-colors border ${
                      isLight 
                        ? "bg-zinc-50 border-zinc-200 focus:border-blue-600 text-zinc-900 placeholder:text-zinc-400" 
                        : "bg-white/5 border-white/10 focus:border-emerald-400 text-white"
                    }`}
                  />
                </div>
                <div className="space-y-1.5 text-left">
                  <label htmlFor="checkout-city" className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">City</label>
                  <input
                    id="checkout-city"
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    placeholder="Dhaka, Chittagong, etc."
                    className={`w-full text-xs px-4 py-3 rounded-full outline-none transition-colors border ${
                      isLight 
                        ? "bg-zinc-50 border-zinc-200 focus:border-blue-600 text-zinc-900 placeholder:text-zinc-400" 
                        : "bg-white/5 border-white/10 focus:border-emerald-400 text-white"
                    }`}
                  />
                </div>
              </div>

              <div className={`flex items-center gap-2 border-b pb-4 pt-6 ${isLight ? "border-zinc-100" : "border-white/5"}`}>
                <Wallet className={`w-5 h-5 ${isLight ? "text-blue-600" : "text-emerald-400"}`} />
                <h3 className={`text-lg font-black uppercase tracking-wider ${isLight ? "text-zinc-850" : "text-white"}`}>Payment Methods</h3>
              </div>

              {/* Payment Methods Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { id: "COD", name: "Cash on Delivery", desc: "Pay in cash at delivery" },
                  { id: "bKash", name: "bKash Personal", desc: "Send to 01333600272" },
                  { id: "Nagad", name: "Nagad Personal", desc: "Send to 01333600272" }
                ].map((method) => (
                  <div
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`relative rounded-2xl border p-4 cursor-pointer flex flex-col justify-between transition-all duration-300 ${
                      paymentMethod === method.id
                        ? isLight
                          ? "border-zinc-900 bg-zinc-50/50 shadow-sm"
                          : "border-emerald-400 bg-emerald-500/[0.03] shadow-md shadow-emerald-400/[0.02]"
                        : isLight
                        ? "border-zinc-200 bg-white hover:border-zinc-300"
                        : "border-white/10 bg-zinc-950/20 hover:border-white/20"
                    }`}
                  >
                    {paymentMethod === method.id && (
                      <div className={`absolute top-2 right-2 w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                        isLight ? "bg-zinc-900 text-white" : "bg-emerald-400 text-black"
                      }`}>
                        <Check className="w-2.5 h-2.5" />
                      </div>
                    )}
                    <span className={`text-[11px] font-black uppercase tracking-widest ${isLight ? "text-zinc-900" : "text-white"}`}>
                      {method.name}
                    </span>
                    <span className="text-[10px] text-zinc-500 font-medium mt-2">{method.desc}</span>
                  </div>
                ))}
              </div>

              {/* Mobile Banking Transaction Input */}
              {(paymentMethod === "bKash" || paymentMethod === "Nagad") && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-5 rounded-2xl border space-y-3 ${
                    isLight ? "bg-zinc-50 border-zinc-200" : "bg-white/[0.02] border-white/5"
                  }`}
                >
                  <p className={`text-[10px] font-black uppercase tracking-wider ${isLight ? "text-zinc-700" : "text-zinc-300"}`}>
                    Mobile Payment Instructions:
                  </p>
                  <ol className="list-decimal pl-4 text-[10px] text-zinc-500 space-y-1 font-medium text-left">
                    <li>Open your {paymentMethod} app, select <strong>"Send Money"</strong>.</li>
                    <li>Enter target number: <strong>01333600272</strong>.</li>
                    <li>Enter Amount: <strong>৳ {toBdt(total)}</strong>.</li>
                    <li>Complete transfer and copy the <strong>Transaction ID</strong> below.</li>
                  </ol>
                  <div className="space-y-1.5 text-left pt-2">
                    <label htmlFor="transaction-id" className="text-[9px] uppercase font-bold text-zinc-500 tracking-wider">Transaction ID</label>
                    <input
                      id="transaction-id"
                      type="text"
                      value={transactionId}
                      onChange={(e) => setTransactionId(e.target.value)}
                      required
                      placeholder="e.g. TRN12345678"
                      className={`w-full text-xs px-4 py-3 rounded-full outline-none transition-colors border ${
                        isLight 
                          ? "bg-white border-zinc-200 focus:border-blue-600 text-zinc-900 placeholder:text-zinc-400" 
                          : "bg-zinc-950 border-white/10 focus:border-emerald-400 text-white"
                      }`}
                    />
                  </div>
                </motion.div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full font-black uppercase tracking-widest text-xs py-4 rounded-full transition-all flex items-center justify-center gap-2 transform hover:scale-[1.01] mt-8 cursor-pointer ${
                  isSubmitting
                    ? "opacity-50 cursor-not-allowed"
                    : isLight 
                    ? "bg-zinc-950 hover:bg-zinc-800 text-white shadow-md shadow-zinc-950/10" 
                    : "bg-emerald-400 hover:bg-emerald-300 text-black shadow-emerald-500/20"
                }`}
              >
                {isSubmitting ? (
                  <div className="w-4 h-4 border-2 border-zinc-600 border-t-white rounded-full animate-spin" />
                ) : (
                  <>Place Order Now <ArrowRight className="w-4 h-4" /></>
                )}
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
                      {item.image ? (
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-8 h-8 rounded-lg object-cover flex-shrink-0 border border-zinc-200/20"
                        />
                      ) : (
                        <div 
                          className="w-8 h-8 rounded-lg flex-shrink-0"
                          style={{ backgroundColor: `${item.imgColor || '#4B5563'}40` }}
                        />
                      )}
                      <div className="text-left">
                        <p className={`font-bold line-clamp-1 ${isLight ? "text-zinc-850" : "text-white"}`}>{item.name}</p>
                        {item.customDetails && (
                          <p className="text-[10px] text-zinc-500 font-medium">
                            {item.customDetails.color} | Nic: {item.customDetails.nicotine}
                          </p>
                        )}
                      </div>
                    </div>
                    <span className={`font-bold ${isLight ? "text-zinc-900" : "text-white"}`}>Dhs. {parseFloat(item.price).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              {/* Totals Table */}
              <div className={`pt-4 border-t space-y-2 text-xs ${isLight ? "border-zinc-100 text-zinc-800" : "border-white/5 text-white"}`}>
                <div className="flex justify-between"><span className="text-zinc-500 font-medium">Subtotal</span><span className={`font-bold ${isLight ? "text-zinc-900" : "text-white"}`}>Dhs. {subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between"><span className="text-zinc-500 font-medium">Delivery Fee</span><span className={`font-bold ${isLight ? "text-zinc-900" : "text-white"}`}>Dhs. {shipping.toFixed(2)}</span></div>
                <div className={`flex justify-between pt-4 border-t text-sm font-black ${isLight ? "border-zinc-100" : "border-white/5"}`}>
                  <span className={`uppercase tracking-wider ${isLight ? "text-zinc-900" : "text-white"}`}>Total Amount</span>
                  <span className={`font-black ${isLight ? "text-blue-600" : "text-emerald-400"}`}>Dhs. {total.toFixed(2)}</span>
                </div>
              </div>

              {/* Secure checkout info */}
              <div className={`border rounded-2xl p-4 flex items-start gap-3 transition-colors ${
                isLight ? "bg-zinc-50 border-zinc-200" : "bg-white/[0.01] border-white/5"
              }`}>
                <ShieldCheck className={`w-5 h-5 flex-shrink-0 ${isLight ? "text-blue-600" : "text-emerald-400"}`} />
                <div className="text-left space-y-1">
                  <p className={`text-[10px] uppercase font-bold tracking-widest ${isLight ? "text-zinc-850" : "text-white"}`}>Secure Order Processing</p>
                  <p className="text-[10px] text-zinc-500 font-light leading-relaxed">
                    Orders are processed instantly and synced with Shopify databases. We ensure age-verification protocols are compliant.
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
