"use client";
import { motion } from "framer-motion";
import { 
  ShoppingCart, 
  CreditCard, 
  Truck, 
  ShieldCheck, 
  Box, 
  RefreshCcw, 
  Headset, 
  Zap, 
  Star, 
  CheckCircle, 
  ArrowRight,
  Package,
  Lock,
  Smartphone,
  Banknote
} from "lucide-react";

export default function About({ theme, shopifyPage }) {
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

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className={`min-h-screen pt-32 pb-20 px-4 sm:px-6 w-full max-w-7xl mx-auto ${isLight ? "text-zinc-900" : "text-white"}`}>
      
      {/* SECTION 1: E-commerce Hero */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="flex flex-col items-center text-center mb-32"
      >
        <motion.div variants={staggerItem} className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6 bg-red-500/10 text-red-500">
          <ShoppingCart className="w-4 h-4" /> The Ultimate Online Store
        </motion.div>
        <motion.h1 
          variants={staggerItem}
          className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-tight"
        >
          Dubai's #1 Online <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">
            Vape Marketplace
          </span>
        </motion.h1>
        <motion.p 
          variants={staggerItem}
          className={`max-w-2xl text-lg sm:text-2xl leading-relaxed ${isLight ? "text-zinc-600" : "text-zinc-400"}`}
        >
          Experience seamless online shopping. We bring the world's most premium vape brands directly to your doorstep with unmatched speed and security.
        </motion.p>
      </motion.div>

      {/* SECTION 2: Our E-commerce Journey (Bento Grid) */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUp}
        className="mb-32"
      >
        <div className={`p-8 md:p-12 rounded-[2.5rem] border ${isLight ? "bg-white border-zinc-200 shadow-xl shadow-zinc-200/50" : "bg-zinc-900/40 border-white/10 shadow-2xl shadow-black/50"}`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="pr-0 lg:pr-8">
              <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Redefining Digital Retail</h2>
              <p className={`text-lg leading-relaxed mb-6 ${isLight ? "text-zinc-600" : "text-zinc-400"}`}>
                What started as a vision to make authentic vaping products easily accessible has evolved into a state-of-the-art e-commerce platform. We've built an infrastructure designed entirely around the customer's shopping experience.
              </p>
              <p className={`text-lg leading-relaxed ${isLight ? "text-zinc-600" : "text-zinc-400"}`}>
                From real-time inventory syncing to intelligent logistics and secure checkout gateways, VapePod is engineered to provide a flawless, hassle-free online buying journey from cart to doorstep.
              </p>
            </div>
            
            {/* Staggered Grid for Stats */}
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4 md:gap-6"
            >
              {[
                { label: "Products Listed", value: "1,500+" },
                { label: "Orders Shipped", value: "50k+" },
                { label: "Happy Customers", value: "30k+" },
                { label: "Delivery Success", value: "99.9%" }
              ].map((stat, i) => (
                <motion.div 
                  variants={staggerItem}
                  key={i} 
                  className={`p-6 sm:p-8 rounded-3xl border flex flex-col justify-center items-center text-center transition-all hover:scale-105 ${
                    isLight ? "bg-zinc-50 border-zinc-200" : "bg-zinc-800/50 border-white/5"
                  }`}
                >
                  <h3 className="text-4xl sm:text-5xl font-black text-red-500 mb-2">{stat.value}</h3>
                  <p className={`text-xs sm:text-sm font-bold uppercase tracking-widest ${isLight ? "text-zinc-500" : "text-zinc-400"}`}>{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* SECTION 3: E-commerce Core Features (Staggered Grid) */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="mb-32"
      >
        <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black text-center mb-16 tracking-tight">Built For Online Shoppers</motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {[
            { icon: <CreditCard className="w-6 h-6"/>, title: "Secure Payments", desc: "Encrypted transactions via card or Cash on Delivery." },
            { icon: <Truck className="w-6 h-6"/>, title: "Express Shipping", desc: "Same-day delivery in Dubai, next-day across UAE." },
            { icon: <ShieldCheck className="w-6 h-6"/>, title: "Buyer Protection", desc: "100% authenticity guarantee on all catalog items." },
            { icon: <RefreshCcw className="w-6 h-6"/>, title: "Easy Returns", desc: "Hassle-free 7-day return policy for unopened products." }
          ].map((feature, idx) => (
            <motion.div
              variants={staggerItem}
              key={idx}
              className={`p-8 rounded-[2rem] border transition-all hover:-translate-y-2 ${
                isLight 
                  ? "bg-white border-zinc-200 shadow-xl shadow-zinc-200/50" 
                  : "bg-zinc-900/50 border-white/10 shadow-xl shadow-black/50"
              }`}
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${
                isLight ? "bg-red-50 text-red-500" : "bg-red-500/10 text-red-400"
              }`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className={`leading-relaxed ${isLight ? "text-zinc-600" : "text-zinc-400"}`}>
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* SECTION 4: Massive Inventory Showcase */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUp}
        className="mb-32"
      >
        <div className={`rounded-[2.5rem] p-10 sm:p-16 overflow-hidden relative ${
          isLight ? "bg-zinc-950 text-white" : "bg-[#09090A] border border-white/10 text-white"
        }`}>
          <div className="relative z-10 max-w-2xl">
            <Package className="w-12 h-12 mb-8 text-red-500" />
            <h2 className="text-4xl sm:text-5xl font-black mb-6 tracking-tight">Unrivaled Catalog</h2>
            <p className="text-xl opacity-90 leading-relaxed mb-10 text-zinc-300">
              We stock everything from starter kits and disposable pods to premium e-liquids and advanced mods. Our inventory is synced in real-time, meaning if you can add it to your cart, it's sitting in our warehouse ready to ship.
            </p>
            <button className="inline-flex items-center gap-3 font-bold uppercase tracking-widest text-sm px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
              Browse Categories <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          {/* Decorative background element */}
          <div className="absolute top-0 right-0 w-[30rem] h-[30rem] bg-red-500 rounded-full blur-[120px] opacity-20 transform translate-x-1/4 -translate-y-1/4 pointer-events-none" />
        </div>
      </motion.section>

      {/* SECTION 5: Shopping Perks (List with Image/Icon Box Grid) */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="mb-32"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div variants={fadeUp} className={`aspect-square p-8 rounded-[2.5rem] border flex flex-col items-center justify-center text-center ${
            isLight ? "bg-zinc-50 border-zinc-200" : "bg-zinc-900/30 border-white/10"
          }`}>
            <motion.div 
              animate={{ rotate: [0, 10, -10, 0] }} 
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            >
              <Headset className="w-24 h-24 text-red-500 mb-8" />
            </motion.div>
            <h3 className="text-3xl font-black mb-4 tracking-tight">24/7 Live Support</h3>
            <p className={`text-lg leading-relaxed max-w-sm ${isLight ? "text-zinc-600" : "text-zinc-400"}`}>
              Got a question about a product or your order status? Our dedicated e-commerce support team is online 24/7 to assist you via chat or email.
            </p>
          </motion.div>
          
          <div className="space-y-8">
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black tracking-tight">Why Shop Here?</motion.h2>
            <div className="space-y-6">
              {[
                "Instant order confirmation and live tracking links",
                "Automated stock alerts for sold-out items",
                "Exclusive loyalty points on every purchase",
                "Mobile-optimized, blazing-fast storefront",
                "Wholesale & bulk order discounts available"
              ].map((point, i) => (
                <motion.div variants={staggerItem} key={i} className={`flex items-start gap-4 p-4 rounded-2xl ${isLight ? "hover:bg-zinc-50" : "hover:bg-zinc-900/50"} transition-colors`}>
                  <CheckCircle className="w-7 h-7 text-red-500 shrink-0 mt-0.5" />
                  <p className={`text-xl font-medium ${isLight ? "text-zinc-800" : "text-zinc-200"}`}>
                    {point}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* SECTION 6: Customer Reviews */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="mb-32"
      >
        <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black text-center mb-16 tracking-tight">What Online Shoppers Say</motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {[
            { title: "Fastest Checkout", text: "The website is so fast. Found my Juul pods, checked out in 1 minute, and got it delivered the same evening.", author: "Tariq A." },
            { title: "Great Packaging", text: "Items arrived securely packaged with a digital receipt. Very professional e-commerce setup.", author: "Elena S." },
            { title: "Real-time Tracking", text: "I loved that I could track my order on the map right to my door. Top tier service.", author: "Mike D." }
          ].map((review, i) => (
            <motion.div variants={staggerItem} key={i} className={`p-8 rounded-[2rem] border transition-transform hover:-translate-y-2 ${
              isLight ? "bg-white border-zinc-200 shadow-xl shadow-zinc-200/50" : "bg-zinc-900/40 border-white/10"
            }`}>
              <div className="flex text-yellow-500 mb-6">
                {[...Array(5)].map((_, idx) => <Star key={idx} className="w-5 h-5 fill-current" />)}
              </div>
              <h4 className="font-black text-xl mb-3">{review.title}</h4>
              <p className={`text-base leading-relaxed mb-8 ${isLight ? "text-zinc-600" : "text-zinc-400"}`}>
                "{review.text}"
              </p>
              <span className={`text-xs font-black uppercase tracking-widest px-3 py-1 rounded-md ${isLight ? "bg-zinc-100 text-zinc-600" : "bg-zinc-800 text-zinc-400"}`}>
                {review.author}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* SECTION 7: Trusted Payment Methods */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUp}
        className="mb-32"
      >
        <div className={`p-10 md:p-16 rounded-[2.5rem] border text-center ${
          isLight ? "bg-white border-zinc-200 shadow-xl shadow-zinc-200/50" : "bg-zinc-900/40 border-white/10 shadow-2xl shadow-black/50"
        }`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-8 bg-green-500/10 text-green-500">
            <Lock className="w-4 h-4" /> 100% Secure Checkout
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Trusted Payment Methods</h2>
          <p className={`max-w-2xl mx-auto mb-12 text-xl leading-relaxed ${isLight ? "text-zinc-600" : "text-zinc-400"}`}>
            We accept all major global and local payment methods. Your payment details are encrypted using industry-leading 256-bit SSL security to ensure complete peace of mind.
          </p>
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4 sm:gap-6"
          >
            {[
              { icon: <CreditCard className="w-6 h-6" />, name: "Visa & Mastercard" },
              { icon: <Smartphone className="w-6 h-6" />, name: "Apple Pay" },
              { icon: <Smartphone className="w-6 h-6" />, name: "Google Pay" },
              { icon: <Banknote className="w-6 h-6" />, name: "Cash on Delivery" }
            ].map((method, i) => (
              <motion.div variants={staggerItem} key={i} className={`flex items-center gap-4 px-8 py-5 rounded-2xl border transition-all hover:scale-105 cursor-default ${
                isLight ? "bg-zinc-50 border-zinc-200 text-zinc-900" : "bg-zinc-800/50 border-white/10 text-white"
              }`}>
                <div className={`${isLight ? "text-zinc-500" : "text-zinc-400"}`}>{method.icon}</div>
                <span className="font-bold text-lg">{method.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* SECTION 8: Final CTA */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUp}
      >
        <div className={`p-12 md:p-20 rounded-[2.5rem] text-center border relative overflow-hidden ${
          isLight ? "bg-red-50 border-red-100" : "bg-red-500/10 border-red-500/20"
        }`}>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Ready to Fill Your Cart?</h2>
            <p className={`max-w-2xl mx-auto mb-10 text-xl leading-relaxed ${isLight ? "text-zinc-700" : "text-red-100/80"}`}>
              Browse our catalog, add your favorite pods to the cart, and experience the most streamlined checkout in the industry.
            </p>
            <button className={`px-10 py-5 rounded-full font-black uppercase tracking-widest text-sm transition-all flex items-center justify-center gap-3 mx-auto hover:scale-105 shadow-xl ${
              isLight ? "bg-red-500 text-white hover:bg-red-600 shadow-red-500/30" : "bg-red-500 text-white hover:bg-red-400 shadow-red-500/20"
            }`}>
              <ShoppingCart className="w-5 h-5" /> Start Shopping Now
            </button>
          </div>
          
          <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-red-500 rounded-full blur-[150px] opacity-10 transform -translate-x-1/2 translate-y-1/2 pointer-events-none" />
        </div>
      </motion.section>

    </div>
  );
}
