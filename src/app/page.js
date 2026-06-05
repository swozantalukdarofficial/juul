"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Home from "@/components/Home";
import Collection from "@/components/Collection";
import ProductDetail from "@/components/ProductDetail";
import Checkout from "@/components/Checkout";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";
import FloatingSocials from "@/components/FloatingSocials";

export default function MainApp() {
  const [currentPage, _setCurrentPage] = useState("home");
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [versionFilter, setVersionFilter] = useState("all");
  const [theme, setTheme] = useState("light"); // Default is light ("Samsung Website White Edition")
  const [isLoading, setIsLoading] = useState(true);

  const setCurrentPage = (page) => {
    if (page === "home") {
      _setCurrentPage("home");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setShowComingSoon(true);
      setIsCartOpen(false); // Close cart if they tried to checkout from the drawer
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleAddToCart = (product) => {
    setCart((prev) => [...prev, product]);
    // Auto-open cart to show added status
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (indexToRemove) => {
    setCart((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Determine which page to render based on State Routing
  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return (
          <Home 
            setCurrentPage={setCurrentPage} 
            setCategoryFilter={setCategoryFilter} 
            setVersionFilter={setVersionFilter}
            onAddToCart={handleAddToCart}
            setSelectedProduct={setSelectedProduct}
            theme={theme} 
            key="home" 
          />
        );
      case "collection":
        return (
          <Collection
            onAddToCart={handleAddToCart}
            setCurrentPage={setCurrentPage}
            setSelectedProduct={setSelectedProduct}
            activeCategory={categoryFilter}
            setActiveCategory={setCategoryFilter}
            versionFilter={versionFilter}
            setVersionFilter={setVersionFilter}
            theme={theme}
            key="collection"
          />
        );
      case "product":
        return (
          <ProductDetail
            selectedProduct={selectedProduct}
            onAddToCart={handleAddToCart}
            setCurrentPage={setCurrentPage}
            theme={theme}
            key="product"
          />
        );
      case "checkout":
        return (
          <Checkout
            cart={cart}
            onClearCart={handleClearCart}
            setCurrentPage={setCurrentPage}
            theme={theme}
            key="checkout"
          />
        );
      default:
        return <Home setCurrentPage={setCurrentPage} theme={theme} key="home" />;
    }
  };

  return (
    <div className={`min-h-screen flex flex-col justify-between overflow-x-hidden font-sans transition-colors duration-500 ${
      theme === "light" ? "bg-white text-zinc-900" : "bg-[#09090A] text-white"
    }`}>
      {/* ═══ GLOBAL LOADING OVERLAY ═══ */}
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            key="global-loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={`fixed inset-0 z-[99999] flex items-center justify-center ${theme === "light" ? "bg-zinc-50" : "bg-[#050506]"}`}
          >
            <div className="relative w-full h-full">
              <div className="loader-dots"></div>
              <div className="loader-dots"></div>
              <div className="loader-dots"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        /* Uiverse Loader CSS (GPU Optimized for 120 FPS) */
        .loader-dots {
          position: absolute;
          top: 50%;
          left: 50%;
          z-index: 10;
          width: 160px;
          height: 100px;
          margin-left: -80px;
          margin-top: -50px;
          border-radius: 5px;
          background: #1e3f57;
          animation: dot1_ 3s cubic-bezier(0.55,0.3,0.24,0.99) infinite;
          will-change: transform;
        }
        .loader-dots:nth-child(2) {
          z-index: 11;
          width: 150px;
          height: 90px;
          margin-top: -45px;
          margin-left: -75px;
          border-radius: 3px;
          background: #3c517d;
          animation-name: dot2_;
        }
        .loader-dots:nth-child(3) {
          z-index: 12;
          width: 40px;
          height: 20px;
          margin-top: 50px;
          margin-left: -20px;
          border-radius: 0 0 5px 5px;
          background: #6bb2cd;
          animation-name: dot3_;
        }
        @keyframes dot1_ {
          3%,97% { transform: scale(1, 1); }
          30%,36% { transform: scale(0.5, 1.2); }
          63%,69% { transform: scale(0.25, 0.8); }
        }
        @keyframes dot2_ {
          3%,97% { transform: scale(1, 1); }
          30%,36% { transform: scale(0.466, 1.066); }
          63%,69% { transform: scale(0.213, 0.666); }
        }
        @keyframes dot3_ {
          3%,97% { transform: translate(0, 0) scale(1, 1); border-radius: 0 0 5px 5px; }
          30%,36% { transform: translate(1px, -7px) scale(0.2, 0.4); border-radius: 8px; }
          63%,69% { transform: translate(0, -95px) scale(0.4, 0.2); border-radius: 10px; }
        }
      `}</style>
      {/* Premium Marquee Announcement Bar */}
      <div className={`fixed top-0 left-0 right-0 w-full z-[60] overflow-hidden select-none border-b ${
        theme === "light"
          ? "bg-zinc-50 border-zinc-200/80"
          : "bg-[#0A0A0B] border-white/5"
      }`} style={{ height: "36px" }}>
        <div className="flex items-center h-full">
          <div
            className="flex items-center gap-0 animate-[marquee_28s_linear_infinite] whitespace-nowrap"
            style={{ willChange: "transform", transform: "translateZ(0)" }}
          >
            {[...Array(6)].map((_, i) => (
              <span key={i} className="flex items-center gap-6 px-6">
                <span className={`text-[10px] font-bold uppercase tracking-[0.18em] ${
                  theme === "light" ? "text-zinc-700" : "text-zinc-300"
                }`}>
                  🚚 Free Delivery on AED 150+
                </span>
                <span className={`w-1 h-1 rounded-full flex-shrink-0 ${
                  theme === "light" ? "bg-zinc-300" : "bg-zinc-600"
                }`} />
                <span className={`text-[10px] font-bold uppercase tracking-[0.18em] ${
                  theme === "light" ? "text-zinc-700" : "text-zinc-300"
                }`}>
                  ✅ 100% Authentic JUUL Products
                </span>
                <span className={`w-1 h-1 rounded-full flex-shrink-0 ${
                  theme === "light" ? "bg-zinc-300" : "bg-zinc-600"
                }`} />
                <span className={`text-[10px] font-bold uppercase tracking-[0.18em] ${
                  theme === "light" ? "text-zinc-700" : "text-zinc-300"
                }`}>
                  ⚡ 2-Hour Dispatch · Dubai & UAE
                </span>
                <span className={`w-1 h-1 rounded-full flex-shrink-0 ${
                  theme === "light" ? "bg-zinc-300" : "bg-zinc-600"
                }`} />
                <span className={`text-[10px] font-bold uppercase tracking-[0.18em] ${
                  theme === "light" ? "text-zinc-700" : "text-zinc-300"
                }`}>
                  💳 Cash on Delivery Available
                </span>
                <span className={`w-1 h-1 rounded-full flex-shrink-0 ${
                  theme === "light" ? "bg-zinc-300" : "bg-zinc-600"
                }`} />
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Sleek Floating Header */}
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        cartCount={cart.length}
        setIsCartOpen={setIsCartOpen}
        theme={theme}
        setTheme={setTheme}
        versionFilter={versionFilter}
        setVersionFilter={setVersionFilter}
      />

      {/* Dynamic Animated Content Container */}
      <main className="flex-1 w-full relative">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.15, ease: "linear" }}
          className="w-full h-full"
        >
          {renderPage()}
        </motion.div>
      </main>

      {/* Coming Soon Modal */}
      <AnimatePresence>
        {showComingSoon && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className={`max-w-sm w-full p-8 rounded-3xl text-center shadow-2xl border ${
                theme === "light" 
                  ? "bg-white border-zinc-200" 
                  : "bg-zinc-900 border-white/10"
              }`}
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                <span className="text-2xl">🚧</span>
              </div>
              <h3 className={`text-2xl font-black tracking-tight mb-2 ${
                theme === "light" ? "text-zinc-950" : "text-white"
              }`}>
                Under Development
              </h3>
              <p className={`text-sm mb-8 leading-relaxed ${
                theme === "light" ? "text-zinc-600" : "text-zinc-400"
              }`}>
                This section is coming soon! We are currently working hard to bring you this experience.
              </p>
              <button
                onClick={() => setShowComingSoon(false)}
                className={`w-full py-4 rounded-xl text-sm font-black uppercase tracking-widest transition-all ${
                  theme === "light"
                    ? "bg-zinc-950 text-white hover:bg-zinc-800"
                    : "bg-white text-zinc-950 hover:bg-zinc-200"
                }`}
              >
                Got It
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Cart Drawer overlay */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onRemoveFromCart={handleRemoveFromCart}
        setCurrentPage={setCurrentPage}
        theme={theme}
      />

      {/* Floating Social Media Sidebar */}
      <FloatingSocials theme={theme} />

      {/* Premium Footer */}
      <Footer setCurrentPage={setCurrentPage} theme={theme} />
    </div>
  );
}
